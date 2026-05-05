import type { ISkillRepository } from "@application/ports/repository/ISkill.repositorty";
import { Skill } from "@domain/mentor/entities/skills.entity";
import type { Prisma, Skill as PrismaSkill } from "generated/prisma/client";
import { BaseRepository } from "./BaseRepository";
export class SkillRepository
	extends BaseRepository<
		PrismaSkill,
		Skill,
		Prisma.SkillCreateInput,
		Prisma.SkillUpdateInput
	>
	implements ISkillRepository
{
	protected toDomain(record: PrismaSkill): Skill {
		return Skill.create(record);
	}
	protected toPersistence(
		entity: Skill,
	): Omit<Prisma.SkillCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			name: entity.name,
			status: entity.status,
		};
	}
}
