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
	// bookingId: string;
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

export class Payment {
	private constructor(private props: IPayment) {}

	static create(props: CreatePaymentProps) {
		return new Payment({
			...props,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		});
	}

	get id() {
		return this.props.id;
	}

	// get bookingId() {
	//   return this.props.bookingId;
	// }

	get paymentProvider() {
		return this.props.paymentProvider;
	}

	get paymentId() {
		return this.props.paymentId;
	}

	get paymentOrderId() {
		return this.props.paymentOrderId;
	}

	get paymentSignature() {
		return this.props.paymentSignature;
	}

	get amountInMinorUnit() {
		return this.props.amountInMinorUnit;
	}

	get currency() {
		return this.props.currency;
	}

	get status() {
		return this.props.status;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	markSuccess(paymentId: string, paymentSignature: string) {
		this.props.paymentId = paymentId;
		this.props.paymentSignature = paymentSignature;
		this.props.status = PAYMENT_STATUS.SUCCESS;
		this.touch();
	}

	markFailed() {
		this.props.status = PAYMENT_STATUS.FAILED;
		this.touch();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
