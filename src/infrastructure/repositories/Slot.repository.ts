import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Slot } from "@domain/booking/entities/slot.entity";
import type {
	Prisma,
	PrismaClient,
	Slots as PrismaSlots,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

export class SlotRepository
	extends BaseRepository<
		PrismaSlots,
		Slot,
		Prisma.SlotsCreateInput,
		Prisma.SlotsUpdateInput
	>
	implements ISlotRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.slots);
	}

	protected toDomain(record: PrismaSlots): Slot {
		return Slot.create(record);
	}

	protected toPersistence(
		entity: Slot,
	): Omit<Prisma.SlotsCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			date: entity.date,
			startTime: entity.startTime,
			endTime: entity.endTime,
			expiresAt: entity.expiresAt,
			mentor: { connect: { userId: entity.mentorId } },
			status: entity.status,
			user: { connect: { id: entity.lockedBy } },
			bookingId: entity.bookingId,
		};
	}
}
