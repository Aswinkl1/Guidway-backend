import type { Experience } from "@domain/mentor/entities/experience.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IExperienceRepository
	extends IBaseRepository<
		Experience,
		Partial<Experience>,
		Partial<Experience>
	> {}
