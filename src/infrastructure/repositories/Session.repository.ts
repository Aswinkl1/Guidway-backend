import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { PaginatedResult } from "@application/types/paginationResult.types";
import { TYPES } from "@config/DI-container/TYPES";
import { Session } from "@domain/session/session.entitiy";
import type {
	Prisma,
	PrismaClient,
	Session as PrismaSession,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

export class SessionRepository
	extends BaseRepository<
		PrismaSession,
		Session,
		Prisma.SessionCreateInput,
		Prisma.SessionUpdateInput
	>
	implements ISessionRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.session);
	}

	async findManyByMentorId(
		mentorId: string,
		filter: GetAllSessionsDTO,
	): Promise<PaginatedResult<Session>> {
		const { limit, page, isActive, search } = filter;
		const where: Prisma.SessionWhereInput = {};
		where.mentorId = mentorId;
		if (search) {
			where.name = { contains: search, mode: "insensitive" };
		}
		if (isActive !== undefined) {
			where.isActive = isActive;
		}

		const [data, totalItems] = await Promise.all([
			this._prisma.session.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			this._prisma.session.count({ where }),
		]);

		return { data: data.map((r) => this.toDomain(r)), totalItems };
	}
	protected toDomain(record: PrismaSession): Session {
		return Session.create(record);
	}
	protected toPersistence(
		entity: Session,
	): Omit<Prisma.SessionCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			description: entity.description,
			duration: entity.duration,
			mentor: { connect: { userId: entity.mentorId } },
			name: entity.name,
			deletedAt: entity.deletedAt,
			isActive: entity.isActive,
			price: entity.price,
		};
	}
}
