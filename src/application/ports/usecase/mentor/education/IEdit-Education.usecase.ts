import type { EditEducationDTO } from "@application/dto/mentor/education.dto";
import type { EducationOutputDto } from "@application/mappers/education.mapper";

export interface IEditEducationUsecase {
	execute(mentorId: string, dto: EditEducationDTO): Promise<EducationOutputDto>;
}
