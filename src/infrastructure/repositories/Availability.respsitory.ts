import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import {
	Availability,
	type DayOfWeek,
	type IAvailability,
} from "@domain/mentor/entities/availability.entity";
import type {
	Prisma,
	Availability as PrismaAvailability,
	PrismaClient,
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
	constructor(private _prisma: PrismaClient) {
		super(_prisma.availability);
	}
	async checkOverlap(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<IAvailability | null> {
		const record = await this._prisma.availability.findFirst({
			where: {
				mentorId,
				dayOfWeek,
				startTime: { lt: requestEndTime },
				endTime: { gt: requestStartTime },
			},
		});

		if (!record) {
			return null;
		}

		return this.toDomain(record);
	}
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
