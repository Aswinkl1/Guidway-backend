import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import { Session } from "@domain/session/session.entitiy";
import type { Prisma, Session as PrismaSession } from "generated/prisma/client";
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
