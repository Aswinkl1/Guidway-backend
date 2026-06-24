import type { Currency } from "./entities/bookingIntent.entity";

export const BOOKING_STATUS = {
	CONFIRMED: "CONFIRMED",
	CANCELLED: "CANCELLED",
	COMPLETED: "COMPLETED",
} as const;

export type BookingStatus =
	(typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export interface IBooking {
	id: string;
	slotId: string;
	sessionId: string;
	sessionTitle: string;
	startTime: Date;
	endTime: Date;
	amount: number;
	currency: Currency;
	note: string | null;
	paymentId: string;
	status: BookingStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateBookingProps
	extends Omit<IBooking, "id" | "status" | "createdAt" | "updatedAt"> {
	id?: string;
	status?: BookingStatus;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Booking {
	private constructor(private props: IBooking) {}

	static create(props: CreateBookingProps): Booking {
		return new Booking({
			...props,
			id: props.id ?? "",
			status: props.status ?? BOOKING_STATUS.CONFIRMED,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		});
	}

	get id() {
		return this.props.id;
	}

	get slotId() {
		return this.props.slotId;
	}

	get sessionId() {
		return this.props.sessionId;
	}

	get sessionTitle() {
		return this.props.sessionTitle;
	}

	get startTime() {
		return this.props.startTime;
	}

	get endTime() {
		return this.props.endTime;
	}

	get amount() {
		return this.props.amount;
	}

	get currency() {
		return this.props.currency;
	}

	get note() {
		return this.props.note;
	}

	get paymentId() {
		return this.props.paymentId;
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

	cancel(): void {
		if (this.props.status === BOOKING_STATUS.COMPLETED) {
			throw new Error("Cannot cancel a completed booking.");
		}
		this.props.status = BOOKING_STATUS.CANCELLED;
		this.touch();
	}

	complete(): void {
		if (this.props.status === BOOKING_STATUS.CANCELLED) {
			throw new Error("Cannot complete a cancelled booking.");
		}
		this.props.status = BOOKING_STATUS.COMPLETED;
		this.touch();
	}

	updateNote(newNote: string): void {
		this.props.note = newNote;
		this.touch();
	}

	private touch(): void {
		this.props.updatedAt = new Date();
	}
}
