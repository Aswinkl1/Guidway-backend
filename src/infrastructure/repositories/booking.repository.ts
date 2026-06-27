import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { BookingIntentAggregate } from "@application/types/booking.types";
import { TYPES } from "@config/DI-container/TYPES";
import { Booking } from "@domain/booking/booking.entity";
import { SLOT_STATUS } from "@domain/booking/entities/slot.entity";
import {
	Prisma,
	type Booking as PrismaBooking,
	type PrismaClient,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

export default class BookingRepository
	extends BaseRepository<
		PrismaBooking,
		Booking,
		Partial<Booking>,
		Partial<Booking>
	>
	implements IBookingRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.booking);
	}
	async createBookingTransaction(
		data: BookingIntentAggregate,
		config: VerifyPaymentDto,
	): Promise<void> {
		const record = await this._prisma.$transaction(async (tx) => {
			const payment = await tx.payment.create({
				data: {
					paymentId: config.gatewayPaymentId,
					paymentOrderId: config.gatewayOrderId,
					paymentSignature: config.gatewaySignature,
					currency: data.bookingIntent.currency,
					amountInMinorUnit: data.bookingIntent.price,
					paymentProvider: config.provider,
				},
			});

			const booking = await tx.booking.create({
				data: {
					amount: data.bookingIntent.price,
					currency: data.bookingIntent.currency,
					startTime: data.slot.startTime,
					endTime: data.slot.endTime,
					mentorId: data.slot.mentorId,
					sessionTitle: data.session.name,
					userId: data.slot.lockedBy,
					paymentId: payment.id,
				},
			});

			await tx.slots.update({
				where: { id: data.slot.id },
				data: { status: SLOT_STATUS.BOOKED },
			});
		});
	}

	protected toDomain(record: PrismaBooking): Booking {
		return Booking.create(record);
	}

	protected toPersistence(
		bookingEntity: Booking,
	): Omit<Partial<Booking>, "createdAt" | "updatedAt"> {
		return {
			id: bookingEntity.id,
			slotId: bookingEntity.slotId,
			sessionId: bookingEntity.sessionId,
			userId: bookingEntity.userId,
			mentorId: bookingEntity.mentorId,
			status: bookingEntity.status,
			note: bookingEntity.note,
			amount: bookingEntity.amount,
			currency: bookingEntity.currency,
			sessionTitle: bookingEntity.sessionTitle,
			startTime: bookingEntity.startTime,
			endTime: bookingEntity.endTime,
			paymentId: bookingEntity.paymentId,
		};
	}
}
