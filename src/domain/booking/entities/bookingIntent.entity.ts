export interface IBookingIntent {
	slotId: string;
	sessionId: string;
	note: string | null;
	price: number;
	currency: string;
	gatewayOrderId: string | null;
	paymentProvider: string | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateBookingIntentProps
	extends Omit<IBookingIntent, "createdAt" | "updatedAt"> {
	createdAt?: Date;
	updatedAt?: Date;
}

export class BookingIntent {
	private constructor(private props: IBookingIntent) {}

	static create(props: CreateBookingIntentProps) {
		return new BookingIntent({
			...props,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		});
	}

	get slotId() {
		return this.props.slotId;
	}

	get sessionId() {
		return this.props.sessionId;
	}

	get note() {
		return this.props.note;
	}

	get price() {
		return this.props.price;
	}

	get currency() {
		return this.props.currency;
	}

	get gatewayOrderId() {
		return this.props.gatewayOrderId;
	}

	get paymentProvider() {
		return this.props.paymentProvider;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	updatePaymentDetails(gatewayOrderId: string, paymentProvider: string) {
		this.props.gatewayOrderId = gatewayOrderId;
		this.props.paymentProvider = paymentProvider;
		this.touch();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
