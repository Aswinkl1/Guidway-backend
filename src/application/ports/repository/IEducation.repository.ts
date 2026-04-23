import type { Education } from "@domain/mentor/entities/education.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IEducationRepository
	extends IBaseRepository<Education, Partial<Education>, Partial<Education>> {}
