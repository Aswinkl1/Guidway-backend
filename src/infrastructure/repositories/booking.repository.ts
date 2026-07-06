import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type {
	BookingDetailsRepoOutput,
	BookingIntentAggregate,
} from "@application/types/booking.types";
import { TYPES } from "@config/DI-container/TYPES";
import { BOOKING_STATUS, Booking } from "@domain/booking/booking.entity";
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

	async findByIdWithUserDetails(
		id: string,
	): Promise<BookingDetailsRepoOutput | null> {
		const record = await this._prisma.booking.findUnique({
			where: { id },
			select: {
				amount: true,
				id: true,
				currency: true,
				endTime: true,
				mentor: {
					select: {
						user: {
							select: {
								name: true,
								profileImageKey: true,
							},
						},
					},
				},
				mentorId: true,
				user: {
					select: {
						name: true,
						profileImageKey: true,
					},
				},
				userId: true,
				sessionId: true,
				sessionTitle: true,
				note: true,
				startTime: true,
				status: true,
			},
		});

		if (!record) {
			return null;
		}

		return {
			id: record.id,
			amount: record.amount,
			currency: record.currency,
			startTime: record.startTime,
			endTime: record.endTime,
			mentor: {
				name: record.mentor.user.name,
				profileImageKey: record.mentor.user.profileImageKey,
			},
			user: {
				name: record.user.name,
				profileImageKey: record.user.profileImageKey,
			},
			mentorId: record.mentorId,
			userId: record.userId,
			note: record.note,
			sessionId: record.sessionId,
			sessionTitle: record.sessionTitle,
			status: record.status,
		};
	}
	async createBookingTransaction(
		data: BookingIntentAggregate & { startTime: Date; endTime: Date },
		config: VerifyPaymentDto,
	): Promise<{ bookingId: string }> {
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
					startTime: data.startTime,
					endTime: data.endTime,
					// mentorId: data.slot.mentorId,
					sessionTitle: data.session.name,
					// userId: data.slot.lockedBy,
					mentor: { connect: { userId: data.slot.mentorId } },
					user: { connect: { id: data.slot.lockedBy } },
					slot: {
						connect: {
							id: data.slot.id,
						},
					},
					session: {
						connect: { id: data.session.id },
					},
					payment: { connect: { id: payment.id } },
					note: data.bookingIntent.note,
				},
			});

			await tx.slots.update({
				where: { id: data.slot.id },
				data: { status: SLOT_STATUS.BOOKED },
			});

			return { bookingId: booking.id };
		});

		return record;
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
