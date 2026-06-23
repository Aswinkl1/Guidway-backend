import { v4 as uuid } from "uuid";

export interface IAvailability {
	id: string;
	mentorId: string;
	dayOfWeek: DayOfWeek;
	startTime: number;
	endTime: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export const DAY_OF_WEEK = {
	MONDAY: "MONDAY",
	TUESDAY: "TUESDAY",
	WEDNESDAY: "WEDNESDAY",
	THURSDAY: "THURSDAY",
	FRIDAY: "FRIDAY",
	SATURDAY: "SATURDAY",
	SUNDAY: "SUNDAY",
} as const;
export type DayOfWeek = (typeof DAY_OF_WEEK)[keyof typeof DAY_OF_WEEK];

export const DayOfWeekIndex: Record<number, DayOfWeek> = {
	0: DAY_OF_WEEK.SUNDAY,
	1: DAY_OF_WEEK.MONDAY,
	2: DAY_OF_WEEK.TUESDAY,
	3: DAY_OF_WEEK.WEDNESDAY,
	4: DAY_OF_WEEK.THURSDAY,
	5: DAY_OF_WEEK.FRIDAY,
	6: DAY_OF_WEEK.SATURDAY,
} as const;
export interface CreateAvailabilityProps
	extends Omit<IAvailability, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}
export class Availability {
	private constructor(private props: IAvailability) {}

	static create(props: CreateAvailabilityProps) {
		const finalProps: IAvailability = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		};

		return new Availability(finalProps);
	}

	get id() {
		return this.props.id;
	}

	get mentorId() {
		return this.props.mentorId;
	}

	get dayOfWeek() {
		return this.props.dayOfWeek;
	}

	get startTime() {
		return this.props.startTime;
	}

	get endTime() {
		return this.props.endTime;
	}

	get isActive() {
		return this.props.isActive;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get deletedAt() {
		return this.props.deletedAt;
	}

	delete() {
		if (this.deletedAt !== null) {
			throw new Error("confilit");
		}
		this.props.deletedAt = new Date();
	}
}
