import type {
	Availability,
	DayOfWeek,
} from "@domain/mentor/entities/availability.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IAvailabilityRepository
	extends IBaseRepository<
		Availability,
		Partial<Availability>,
		Partial<Availability>
	> {
	checkOverlap(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<Availability | null>;

	findAll(mentorId: string, day?: DayOfWeek): Promise<Availability[]>;

	updateStatusForEntireDay(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		isActive: boolean,
	): Promise<void>;

	getAvailabilityAndSessionDuration(
		mentorId: string,
		dayOfWeek: DayOfWeek,
	): Promise<{
		availability: { startTime: number; endTime: number }[];
		slotDuration: number;
	}>;
}
