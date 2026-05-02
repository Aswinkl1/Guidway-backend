import type { DeleteExperienceDTO } from "@application/dto/mentor/experience.dto";

export interface IDeleteExperienceUsecase {
	execute(dto: DeleteExperienceDTO): Promise<void>;
}
