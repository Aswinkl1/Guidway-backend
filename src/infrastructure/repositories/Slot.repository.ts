import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Slot } from "@domain/booking/entities/slot.entity";
import { ConflictError } from "@domain/errors/ConflictError";
import { withTransactionRetry } from "@infrastructure/helpers/withTransactionRetry";
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

	async transactionallySaveSlotAndBookingIntent(
		userId: string,
		data: HoldSlotDto & { provider?: string; orderId?: string },
	): Promise<{ slotId: string }> {
		const record = await withTransactionRetry(async () => {
			const record = await this._prisma.$transaction(async (tx) => {
				const overlap = await tx.slots.findFirst({
					where: {
						mentorId: data.mentorId,
						date: data.date,
						startTime: { lt: data.endTime },
						endTime: { gt: data.startTime },
						expiresAt: { gt: new Date() },
						status: { not: "CANCELLED" },
					},
				});

				if (overlap) {
					console.log("hello");
					throw new ConflictError("slot is not avaliable");
				}
				const slotData = await tx.slots.create({
					data: {
						date: data.date,
						startTime: data.startTime,
						endTime: data.endTime,
						expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
						mentorId: data.mentorId,
						status: "LOCKED",
						lockedBy: userId,
					},
				});

				const bookingIntentData = await tx.bookingIntent.create({
					data: {
						slotId: slotData.id,
						sessionId: data.sessionId,
						price: data.price,
						currency: data.currency,
						note: data.note ?? null,
						gatewayOrderId: data.orderId ?? null,
						paymentProvider: data.provider ?? null,
					},
				});
				console.log("why this kolavari");

				return { slotId: slotData.id };
			});

			return record;
		});

		return record;
	}

	async checkOverlap(
		mentorId: string,
		date: Date,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<Slot | null> {
		const record = await this._prisma.slots.findFirst({
			where: {
				mentorId,
				date,
				startTime: { lt: requestEndTime },
				endTime: { gt: requestStartTime },
				expiresAt: { gt: new Date() },
				status: { not: "CANCELLED" },
			},
		});

		if (!record) {
			return null;
		}

		return this.toDomain(record);
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
