import type { IEducationRepository } from "@application/ports/repository/IEducation.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Education } from "@domain/mentor/entities/education.entity";
import type {
	PrismaClient,
	Education as PrismaEducation,
} from "generated/prisma/client";
import { inject } from "inversify";
import { BaseRepository } from "./BaseRepository";

// type CreateInput = Prisma.EducationCreateInput
export default class EducationRepository
	extends BaseRepository<
		PrismaEducation,
		Education,
		Partial<Education>,
		Partial<Education>
	>
	implements IEducationRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.education);
	}

	protected toDomain(record: PrismaEducation): Education {
		return Education.create(record);
	}

	protected toPersistence(
		educationEntity: Partial<Partial<Education>>,
	): Omit<Partial<Education>, "createdAt" | "updatedAt"> {
		return {
			id: educationEntity.id,
			mentorId: educationEntity.mentorId,
			fieldOfStudy: educationEntity.fieldOfStudy,
			institution: educationEntity.institution,
			degree: educationEntity.degree,
			startMonth: educationEntity.startMonth,
			startYear: educationEntity.startYear,
			endMonth: educationEntity.endMonth,
			endYear: educationEntity.endYear,
			isCurrent: educationEntity.isCurrent,
			grade: educationEntity.grade,
			description: educationEntity.description,
			deletedAt: educationEntity.deletedAt,
		};
	}
}
