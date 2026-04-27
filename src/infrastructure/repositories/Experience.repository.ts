import type { IExperienceRepository } from "@application/ports/repository/IExperience.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Experience } from "@domain/mentor/entities/experience.entity";
import type {
	EmploymentType,
	Prisma,
	PrismaClient,
	Experience as PrismaExperience,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";

@injectable()
export default class ExperienceRepository
	extends BaseRepository<
		PrismaExperience,
		Experience,
		Prisma.ExperienceCreateInput,
		Prisma.ExperienceUpdateInput
	>
	implements IExperienceRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.experience);
	}

	protected toDomain(record: PrismaExperience): Experience {
		return Experience.create(record);
	}

	protected toPersistence(entity: Experience): Prisma.ExperienceCreateInput {
		return {
			id: entity.id,
			role: entity.role,
			company: entity.company,
			employmentType: entity.employmentType as EmploymentType,
			description: entity.description,
			startMonth: entity.startMonth,
			startYear: entity.startYear,
			endMonth: entity.endMonth,
			endYear: entity.endYear,
			isCurrent: entity.isCurrent,
			mentor: { connect: { id: entity.mentorId } },
			deletedAt: entity.deletedAt,
		};
	}
}
