import type { Currency } from "./bookingIntent.entity";

export const PAYMENT_STATUS = {
	PENDING: "PENDING",
	SUCCESS: "SUCCESS",
	FAILED: "FAILED",
} as const;

export type PaymentStatus =
	(typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface IPayment {
	id: string;
	bookingId: string;
	paymentProvider: string;
	paymentId: string;
	paymentOrderId: string;
	paymentSignature: string;
	amountInMinorUnit: number;
	currency: Currency;
	status: PaymentStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreatePaymentProps
	extends Omit<IPayment, "createdAt" | "updatedAt"> {
	createdAt?: Date;
	updatedAt?: Date;
}
