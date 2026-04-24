import type { EditEducationDTO } from "@application/dto/mentor/education.dot";
import type { EducationOutputDto } from "@application/mappers/education.mapper";

export interface IEditEducationUsecase {
	execute(mentorId: string, dto: EditEducationDTO): Promise<EducationOutputDto>;
}
