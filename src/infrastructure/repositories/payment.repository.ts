import type { IPaymentRepository } from "@application/ports/repository/IPayment.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Payment } from "@domain/booking/entities/payment.entity";
import type {
	PrismaClient,
	Payment as PrismaPayment,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

export default class PaymentRepository
	extends BaseRepository<
		PrismaPayment,
		Payment,
		Partial<Payment>,
		Partial<Payment>
	>
	implements IPaymentRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.payment);
	}

	protected toDomain(record: PrismaPayment): Payment {
		return Payment.create(record);
	}

	protected toPersistence(
		paymentEntity: Partial<Payment>,
	): Omit<Partial<Payment>, "createdAt" | "updatedAt"> {
		return {
			id: paymentEntity.id,
			// bookingId: paymentEntity.bookingId,
			paymentProvider: paymentEntity.paymentProvider,
			paymentId: paymentEntity.paymentId,
			paymentOrderId: paymentEntity.paymentOrderId,
			paymentSignature: paymentEntity.paymentSignature,
			amountInMinorUnit: paymentEntity.amountInMinorUnit,
			currency: paymentEntity.currency,
			status: paymentEntity.status,
		};
	}
}
