// @application/usecases/mentor/achievement/add-achievement.usecase.ts
import type { CreateAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import {
	AchievementMapper,
	type AchievementOutputDTO,
} from "@application/mappers/acheivement.mapper";
import type { IAchievementRepository } from "@application/ports/repository/IAcheivement.repository";

import type { IAddAchievementUsecase } from "@application/ports/usecase/mentor/achievements/IAdd-Achievement.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { Achievement } from "@domain/mentor/entities/achievement.entity";
import { inject, injectable } from "inversify";

@injectable()
export class AddAchievementUsecase implements IAddAchievementUsecase {
	constructor(
		@inject(TYPES.AchievementRepository)
		private readonly _achievementRepository: IAchievementRepository,
	) {}

	async execute(
		mentorId: string,
		dto: CreateAchievementDTO,
	): Promise<AchievementOutputDTO> {
		const achievementEntity = Achievement.create({ ...dto, mentorId });
		const domainEntity =
			await this._achievementRepository.create(achievementEntity);
		return AchievementMapper.toOutput(domainEntity);
	}
}
