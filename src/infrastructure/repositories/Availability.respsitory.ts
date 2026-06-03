import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import {
	Availability,
	type IAvailability,
} from "@domain/mentor/entities/availability.entity";
import type {
	Prisma,
	Availability as PrismaAvailability,
} from "generated/prisma/client";
import { BaseRepository } from "./BaseRepository";

export class AvailabilityRepository
	extends BaseRepository<
		PrismaAvailability,
		IAvailability,
		Prisma.AvailabilityCreateInput,
		Prisma.AvailabilityUpdateInput
	>
	implements IAvailabilityRepository
{
	protected toDomain(record: PrismaAvailability): IAvailability {
		return Availability.create(record);
	}
	protected toPersistence(
		entity: IAvailability,
	): Omit<Prisma.AvailabilityCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			dayOfWeek: entity.dayOfWeek,
			endTime: entity.endTime,
			mentor: { connect: { userId: entity.mentorId } },
			startTime: entity.startTime,
			deletedAt: entity.deletedAt,
			isActive: entity.isActive,
		};
	}
}
