import type {
	DayOfWeek,
	IAvailability,
} from "@domain/mentor/entities/availability.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IAvailabilityRepository
	extends IBaseRepository<
		IAvailability,
		Partial<IAvailability>,
		Partial<IAvailability>
	> {
	checkOverlap(
		mentorId: string,
		dayOfWeek: DayOfWeek,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<IAvailability | null>;
}
