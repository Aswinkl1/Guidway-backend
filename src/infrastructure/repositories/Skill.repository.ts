import type { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import type { ISkillRepository } from "@application/ports/repository/ISkill.repositorty";
import { TYPES } from "@config/DI-container/TYPES";
import { Skill } from "@domain/mentor/entities/skills.entity";
import type {
	Prisma,
	PrismaClient,
	Skill as PrismaSkill,
} from "generated/prisma/client";
import { inject } from "inversify";
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
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.skill);
	}
	async findAll(filter: GetSkillsQueryDto): Promise<Skill[] | []> {
		const { search } = filter;

		const record = await this._prisma.skill.findMany({
			where: { name: search },
		});

		return record.map((r) => this.toDomain(r));
	}

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
