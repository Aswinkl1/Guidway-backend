import type { CreateEducationDTO } from "@application/dto/mentor/education.dto";
import type { EducationOutputDto } from "@application/mappers/education.mapper";

export interface IAddEducationUsecase {
	execute(
		mentorId: string,
		dto: CreateEducationDTO,
	): Promise<EducationOutputDto>;
}
