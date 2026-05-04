import type { DeleteExperienceDTO } from "@application/dto/mentor/experience.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IExperienceRepository } from "@application/ports/repository/IExperience.repository";
import type { IDeleteExperienceUsecase } from "@application/ports/usecase/mentor/experience/IDelete-Experience.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class DeleteExperienceUsecase implements IDeleteExperienceUsecase {
	constructor(
		@inject(TYPES.ExperienceRepository)
		private readonly _experienceRepository: IExperienceRepository,
	) {}
	async execute(dto: DeleteExperienceDTO): Promise<void> {
		const record = await this._experienceRepository.findById(dto.id);

		if (!record) {
			throw new NotFoundError("experence not found");
		}

		if (record.mentorId !== dto.mentorId) {
			throw new ForbiddenError("you dont have persmission to this ");
		}

		record.delete();

		await this._experienceRepository.save(record.id, record);
	}
}
