import type { EditAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import {
	AchievementMapper,
	type AchievementOutputDTO,
} from "@application/mappers/acheivement.mapper";
import type { IAchievementRepository } from "@application/ports/repository/IAcheivement.repository";
import type { IEditAchievementUsecase } from "@application/ports/usecase/mentor/achievements/IEdit-Achievement.usecase";

import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class EditAchievementUsecase implements IEditAchievementUsecase {
	constructor(
		@inject(TYPES.AchievementRepository)
		private readonly _achievementRepository: IAchievementRepository,
	) {}

	async execute(
		mentorId: string,
		dto: EditAchievementDTO,
	): Promise<AchievementOutputDTO> {
		const achievementEntity = await this._achievementRepository.findById(
			dto.id,
		);

		if (!achievementEntity) {
			throw new NotFoundError("Achievement with this id is not found");
		}

		if (mentorId !== achievementEntity.mentorId) {
			throw new ForbiddenError(
				"You don't have the authority to edit this achievement",
			);
		}

		achievementEntity.update({
			title: dto.title,
			type: dto.type,
			year: dto.year,
		});

		const updatedRecord = await this._achievementRepository.save(
			dto.id,
			achievementEntity,
		);

		return AchievementMapper.toOutput(updatedRecord);
	}
}
