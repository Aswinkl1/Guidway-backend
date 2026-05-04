import type { EditExperienceDTO } from "@application/dto/mentor/experience.dto";
import type { ExperienceOutputDto } from "@application/mappers/experience.mapper";

export interface IEditExperienceUsecase {
	execute(
		mentorId: string,
		dto: EditExperienceDTO,
	): Promise<ExperienceOutputDto>;
}
