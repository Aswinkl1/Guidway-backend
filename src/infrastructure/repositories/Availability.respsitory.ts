import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import { TYPES } from "@config/DI-container/TYPES";
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
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class AvailabilityRepository
	extends BaseRepository<
		PrismaAvailability,
		Availability,
		Prisma.AvailabilityCreateInput,
		Prisma.AvailabilityUpdateInput
	>
	implements IAvailabilityRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.availability);
	}
	async checkOverlap(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<Availability | null> {
		const record = await this._prisma.availability.findFirst({
			where: {
				mentorId,
				dayOfWeek,
				startTime: { lt: requestEndTime },
				endTime: { gt: requestStartTime },
				deletedAt: null,
			},
		});

		if (!record) {
			return null;
		}

		return this.toDomain(record);
	}

	async findAll(mentorId: string, day?: DayOfWeek): Promise<Availability[]> {
		const records = await this._prisma.availability.findMany({
			where: { mentorId, deletedAt: null, dayOfWeek: day },
		});

		return records.map((m) => this.toDomain(m));
	}

	async updateStatusForEntireDay(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		isActive: boolean,
	): Promise<void> {
		await this._prisma.availability.updateMany({
			where: { mentorId, dayOfWeek },
			data: { isActive },
		});
	}

	async getAvailabilityAndSessionDuration(
		mentorId: string,
		dayOfWeek: DayOfWeek,
	): Promise<{
		availability: { startTime: number; endTime: number }[];
		slotDuration: number;
	}> {
		const record = await this._prisma.availability.findMany({
			where: { mentorId, dayOfWeek, isActive: true, deletedAt: null },
			select: {
				startTime: true,
				endTime: true,
				mentor: { select: { slotDurationMinutes: true } },
			},
			orderBy: { startTime: "asc" },
		});

		return {
			availability: record.map((v) => {
				return { startTime: v.startTime, endTime: v.endTime };
			}),
			slotDuration: record.length ? record[0].mentor.slotDurationMinutes : 0,
		};
	}

	protected toDomain(record: PrismaAvailability): Availability {
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
