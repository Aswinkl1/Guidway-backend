import type { Skill } from "@domain/mentor/entities/skills.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface SkillRepository
	extends IBaseRepository<Skill, Partial<Skill>, Partial<Skill>> {}
