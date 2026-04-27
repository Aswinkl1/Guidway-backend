import type { CreateExperiencedto } from "@application/dto/mentor/experience.dto";
import {
	ExperienceMapper,
	type ExperienceOutputDto,
} from "@application/mappers/experience.mapper";
import type { IExperienceRepository } from "@application/ports/repository/IExperience.repository";
import type { IAddExperienceUsecase } from "@application/ports/usecase/mentor/experience/IAdd-Experience.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { Experience } from "@domain/mentor/entities/experience.entity";
import { inject, injectable } from "inversify";

@injectable()
export class AddExperienceUsecase implements IAddExperienceUsecase {
	constructor(
		@inject(TYPES.ExperienceRepository)
		private readonly _experienceRepository: IExperienceRepository,
	) {}
	execute = async (
		mentorId: string,
		dto: CreateExperiencedto,
	): Promise<ExperienceOutputDto> => {
		const experienceEntity = Experience.create({ ...dto, mentorId });

		const record = await this._experienceRepository.create(experienceEntity);

		return ExperienceMapper.toOutput(record);
	};
}
