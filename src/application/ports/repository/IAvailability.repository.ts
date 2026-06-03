import type { IAvailability } from "@domain/mentor/entities/availability.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IAvailabilityRepository
	extends IBaseRepository<
		IAvailability,
		Partial<IAvailability>,
		Partial<IAvailability>
	> {}
