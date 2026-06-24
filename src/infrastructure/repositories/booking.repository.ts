import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Booking } from "@domain/booking/booking.entity";
import type {
	Booking as PrismaBooking,
	PrismaClient,
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
