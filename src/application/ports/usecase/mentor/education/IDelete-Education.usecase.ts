import type { DeleteEducationDTO } from "@application/dto/mentor/education.dot";

export interface IDeleteEducationUsecase {
	execute(dto: DeleteEducationDTO): Promise<void>;
}
