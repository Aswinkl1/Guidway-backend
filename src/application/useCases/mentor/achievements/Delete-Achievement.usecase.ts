import type { DeleteAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IAchievementRepository } from "@application/ports/repository/IAcheivement.repository";
import type { IDeleteAchievementUsecase } from "@application/ports/usecase/mentor/achievements/IDelete-Achievement.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteAchievementUsecase implements IDeleteAchievementUsecase {
	constructor(
		@inject(TYPES.AchievementRepository)
		private readonly _achievementRepository: IAchievementRepository,
	) {}

	async execute(dto: DeleteAchievementDTO): Promise<void> {
		const record = await this._achievementRepository.findById(dto.id);

		if (!record) {
			throw new NotFoundError("Achievement not found");
		}

		if (record.mentorId !== dto.mentorId) {
			throw new ForbiddenError(
				"You don't have permission to delete this achievement",
			);
		}

		record.delete();

		await this._achievementRepository.save(record.id, record);
	}
}
