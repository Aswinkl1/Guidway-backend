import type { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import type { Skill } from "@domain/mentor/entities/skills.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISkillRepository
	extends IBaseRepository<Skill, Partial<Skill>, Partial<Skill>> {
	findAll(filter: GetSkillsQueryDto): Promise<Skill[] | []>;
}
