import type { CreateExperiencedto } from "@application/dto/mentor/experience.dto";
import type { ExperienceOutputDto } from "@application/mappers/experience.mapper";

export interface IAddExperienceUsecase {
	execute(
		mentorId: string,
		dto: CreateExperiencedto,
	): Promise<ExperienceOutputDto>;
}
