import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type {
	BookingDetailsRepoOutput,
	BookingIntentAggregate,
	BookingOwnerFilter,
	getAllBookingOutput,
} from "@application/types/booking.types";
import { createDateTime, toUTCMidnight } from "@application/utils/date.utils";
import { TYPES } from "@config/DI-container/TYPES";
import {
	BOOKING_EVENT_TYPES,
	BOOKING_STATUS,
	Booking,
} from "@domain/booking/booking.entity";
import { SLOT_STATUS } from "@domain/booking/entities/slot.entity";
import { ConflictError } from "@domain/errors/ConflictError";
import { NotFoundError } from "@domain/errors/UserError";
import { withTransactionRetry } from "@infrastructure/helpers/withTransactionRetry";
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

	async cancelBooking(userId: string, bookingId: string): Promise<void> {
		console.log(userId);
		const result = await this._prisma.$transaction(async (tx) => {
			const res = await tx.booking.updateMany({
				where: { id: bookingId, status: BOOKING_STATUS.CONFIRMED },
				data: { status: BOOKING_STATUS.CANCELLED },
			});

			if (res.count === 0) {
				throw new ConflictError(
					"Booking cannot be cancelled in its current state",
				);
			}

			const booking = await tx.booking.findFirst({ where: { id: bookingId } });

			if (!booking) {
				throw new NotFoundError("booking not found");
			}
			await tx.slots.update({
				where: { id: booking?.slotId },
				data: { status: "CANCELLED" },
			});

			await tx.bookingEvent.create({
				data: {
					type: BOOKING_EVENT_TYPES.CANCELLED,
					actorId: userId,
					bookingId: bookingId,
				},
			});
		});

		return result;
	}

	async findByIdWithUserDetails(
		id: string,
	): Promise<BookingDetailsRepoOutput | null> {
		const record = await this._prisma.booking.findUnique({
			where: { id },
			select: {
				review: {
					where: { deletedAt: null },
					select: {
						rating: true,
						comment: true,
						id: true,
					},
				},
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

		console.log(" record from the repo", record);

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
			review: record?.review[0]?.rating
				? {
						rating: record.review[0].rating,
						comment: record.review[0].comment,
						id: record.review[0].id,
					}
				: undefined,
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

	async findAll(
		owner: BookingOwnerFilter,
		dto: getAllBookingDto,
	): Promise<Omit<getAllBookingOutput, "duration">> {
		let sortOrder: Prisma.SortOrder = "asc";
		console.log(dto);
		const where: Prisma.BookingWhereInput = { ...owner };
		if (
			dto.status === BOOKING_STATUS.COMPLETED ||
			dto.status === BOOKING_STATUS.CANCELLED
		) {
			sortOrder = "desc";
		}
		if (dto.status) {
			where.status = dto.status;
		}

		if (dto.search) {
			where.OR = [
				{
					sessionTitle: {
						contains: dto.search,
						mode: "insensitive",
					},
				},
				"userId" in owner
					? {
							mentor: {
								user: { name: { contains: dto.search, mode: "insensitive" } },
							},
						}
					: { user: { name: { contains: dto.search, mode: "insensitive" } } },
			];
		}

		const [records, count] = await Promise.all([
			this._prisma.booking.findMany({
				where,
				skip: (dto.page - 1) * dto.limit,
				orderBy: { startTime: sortOrder },
				take: dto.limit,
				include: {
					user: { select: { name: true, profileImageKey: true } },
					mentor: {
						include: {
							user: { select: { name: true, profileImageKey: true } },
						},
					},
				},
			}),
			this._prisma.booking.count({ where }),
		]);

		return {
			data: records.map((v) => {
				return {
					id: v.id,
					startTime: v.startTime,
					endTime: v.endTime,
					sessionTitle: v.sessionTitle,
					status: v.status,
					user: {
						name: "userId" in owner ? v.mentor.user.name : v.user.name,
						profileImageKey:
							"userId" in owner
								? v.mentor.user.profileImageKey
								: v.user.profileImageKey,
					},
				};
			}),
			meta: {
				limit: dto.limit,
				page: dto.page,
				totalCount: count,
				totalPages: Math.floor(count / dto.limit),
			},
		};
	}

	rescheduleBooking = async (
		data: rescheduleBookingDto,
		userId: string,
	): Promise<{ bookingId: string }> => {
		const record = await withTransactionRetry(async () => {
			const record = await this._prisma.$transaction(
				async (tx) => {
					const booking = await tx.booking.findUnique({
						where: { id: data.bookingId },
					});

					if (!booking) {
						throw new NotFoundError("booking not found");
					}
					const oldSlotId = booking.slotId;

					const overlap = await tx.slots.findFirst({
						where: {
							mentorId: booking.mentorId,
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
							date: toUTCMidnight(data.date),
							startTime: data.startTime,
							endTime: data.endTime,
							expiresAt: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
							mentorId: booking.mentorId,
							status: SLOT_STATUS.BOOKED,
							lockedBy: booking.userId,
						},
					});
					const updatedStartTime = createDateTime(data.date, data.startTime);
					const updatedEndTime = createDateTime(data.date, data.endTime);

					const updatedBooking = await tx.booking.updateMany({
						where: { id: data.bookingId, status: BOOKING_STATUS.CONFIRMED },
						data: {
							slotId: slotData.id,
							startTime: updatedStartTime,
							endTime: updatedEndTime,
						},
					});
					if (updatedBooking.count === 0) {
						throw new ConflictError(
							"Booking was cancelled or changed before reschedule completed",
						);
					}

					await tx.slots.update({
						where: { id: oldSlotId },
						data: { status: SLOT_STATUS.CANCELLED },
					});

					await tx.bookingEvent.create({
						data: {
							type: BOOKING_EVENT_TYPES.RESCHEDULED,
							actorId: userId,
							bookingId: data.bookingId,
							metadata: {
								oldStartTIme: booking.startTime,
								oldEndTime: booking.endTime,
								newStartTime: updatedStartTime,
								newEndTime: updatedEndTime,
							},
						},
					});

					return { bookingId: data.bookingId };
				},
				{
					isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
				},
			);

			return record;
		});
		return record;
	};

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
