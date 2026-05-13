import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
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
