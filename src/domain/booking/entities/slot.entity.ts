import { v4 as uuid } from "uuid";

export const SLOT_STATUS = {
	LOCKED: "LOCKED",
	BOOKED: "BOOKED",
	CANCELLED: "CANCELLED",
} as const;

export type SlotStatus = (typeof SLOT_STATUS)[keyof typeof SLOT_STATUS];

export interface ISlot {
	id: string;
	bookingId: string | null;
	mentorId: string;
	lockedBy: string;
	date: Date;
	startTime: number;
	endTime: number;
	expiresAt: Date;
	status: SlotStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateSlotProps
	extends Omit<ISlot, "id" | "createdAt" | "updatedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Slot {
	private constructor(private props: ISlot) {}

	static create(props: CreateSlotProps) {
		const finalProps: ISlot = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		};

		return new Slot(finalProps);
	}

	get id() {
		return this.props.id;
	}

	get bookingId() {
		return this.props.bookingId;
	}

	get mentorId() {
		return this.props.mentorId;
	}

	get lockedBy() {
		return this.props.lockedBy;
	}

	get date() {
		return this.props.date;
	}

	get startTime() {
		return this.props.startTime;
	}

	get endTime() {
		return this.props.endTime;
	}

	get expiresAt() {
		return this.props.expiresAt;
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

	lock() {
		if (this.props.status !== SLOT_STATUS.LOCKED) {
			this.props.status = SLOT_STATUS.LOCKED;
			this.touch();
		}
	}

	book(bookingId: string) {
		if (this.props.status !== SLOT_STATUS.LOCKED) {
			throw new Error("Only locked slots can be booked");
		}

		if (this.props.expiresAt < new Date()) {
			throw new Error("Slot lock has expired");
		}

		this.props.bookingId = bookingId;
		this.props.status = SLOT_STATUS.BOOKED;
		this.touch();
	}

	cancel() {
		if (this.props.status === SLOT_STATUS.CANCELLED) {
			throw new Error("Slot already cancelled");
		}

		this.props.status = SLOT_STATUS.CANCELLED;
		this.touch();
	}

	isExpired() {
		return this.props.expiresAt < new Date();
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
