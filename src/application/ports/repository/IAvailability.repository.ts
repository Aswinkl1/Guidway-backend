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

	findAll(mentorId: string): Promise<Availability[]>;
}
