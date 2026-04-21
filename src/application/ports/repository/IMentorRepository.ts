import type { Mentor } from "@domain/mentor/mentor.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IMentorRepository
	extends IBaseRepository<Mentor, Partial<Mentor>, Partial<Mentor>> {}
