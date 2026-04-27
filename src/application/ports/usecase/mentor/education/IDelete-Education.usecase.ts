import type { DeleteEducationDTO } from "@application/dto/mentor/education.dto";

export interface IDeleteEducationUsecase {
	execute(dto: DeleteEducationDTO): Promise<void>;
}
