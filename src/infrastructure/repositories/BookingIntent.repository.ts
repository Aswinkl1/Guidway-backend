import type { IBookingIntentRepository } from "@application/ports/repository/IBookingIntent.repository";
import type { BookingIntentAggregate } from "@application/types/booking.types";
import { TYPES } from "@config/DI-container/TYPES";
import {
	BookingIntent,
	type IBookingIntent,
} from "@domain/booking/entities/bookingIntent.entity";
import { Slot } from "@domain/booking/entities/slot.entity";
import { Session } from "@domain/session/session.entitiy";

import type {
	BookingIntent as PrismaBookingIntent,
	PrismaClient,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class BookingIntentRepository implements IBookingIntentRepository {
	constructor(
		@inject(TYPES.PrismaClient) private readonly _prisma: PrismaClient,
	) {}
	async create(data: BookingIntent): Promise<BookingIntent> {
		const dbData = this.toPersistence(data);
		const record = await this._prisma.bookingIntent.create({ data: dbData });
		return this.toDomain(record);
	}
	async findBySlotId(slotId: string): Promise<BookingIntent | null> {
		const record = await this._prisma.bookingIntent.findUnique({
			where: { slotId },
		});
		if (!record) {
			return null;
		}
		return this.toDomain(record);
	}
	async save(slotId: string, entity: BookingIntent): Promise<BookingIntent> {
		const data = this.toPersistence(entity);

		const record = await this._prisma.bookingIntent.update({
			where: { slotId },
			data,
		});

		return this.toDomain(record);
	}
	async findByGatewayOrderId(
		gatewayOrderId: string,
	): Promise<BookingIntentAggregate | null> {
		const record = await this._prisma.bookingIntent.findFirst({
			where: { gatewayOrderId },
			include: {
				slot: true,
				session: true,
			},
		});
		if (!record) {
			return null;
		}

		return {
			bookingIntent: this.toDomain(record),
			slot: Slot.create(record.slot),
			session: Session.create(record.session),
		};
	}
	async deleteBySlotId(slotId: string): Promise<void> {
		await this._prisma.bookingIntent.delete({ where: { slotId } });
	}

	toDomain(data: PrismaBookingIntent): BookingIntent {
		return BookingIntent.create(data);
	}

	toPersistence(
		data: BookingIntent,
	): Omit<IBookingIntent, "createdAt" | "updatedAt"> {
		return {
			currency: data.currency,
			gatewayOrderId: data.gatewayOrderId,
			note: data.note,
			paymentProvider: data.paymentProvider,
			price: data.price,
			sessionId: data.sessionId,
			slotId: data.slotId,
		};
	}
}
