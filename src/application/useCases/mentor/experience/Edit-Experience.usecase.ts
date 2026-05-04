import type { EditExperienceDTO } from "@application/dto/mentor/experience.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import {
	ExperienceMapper,
	type ExperienceOutputDto,
} from "@application/mappers/experience.mapper";
import type { IExperienceRepository } from "@application/ports/repository/IExperience.repository";
import type { IEditExperienceUsecase } from "@application/ports/usecase/mentor/experience/IEdit-Experience.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class EditExperienceUsecase implements IEditExperienceUsecase {
	constructor(
		@inject(TYPES.ExperienceRepository)
		private readonly _experienceRepository: IExperienceRepository,
	) {}
	async execute(
		mentorId: string,
		dto: EditExperienceDTO,
	): Promise<ExperienceOutputDto> {
		const experienceEntity = await this._experienceRepository.findById(dto.id);

		if (!experienceEntity) {
			throw new NotFoundError("expericen with this id is not found");
		}

		if (mentorId !== experienceEntity.mentorId) {
			throw new ForbiddenError("you dont have the authority to edit this ");
		}

		experienceEntity.update(dto);

		const updatedRecord = await this._experienceRepository.save(
			dto.id,
			experienceEntity,
		);

		return ExperienceMapper.toOutput(updatedRecord);
	}
}
