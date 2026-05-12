import type { MentorStatusUpdateDTO } from "@application/dto/mentor/MentorStatusUpdate.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IMentorStatusUpdateUsecase } from "@application/ports/usecase/mentor/IMentorStatusUpdate.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class MentorStatusUpdateUsecase implements IMentorStatusUpdateUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
	) {}
	async execute(userId: string, dto: MentorStatusUpdateDTO): Promise<void> {
		const mentor = await this._mentorRepository.findMentorByUserId(userId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		if (mentor.userId !== userId) {
			throw new ForbiddenError("you cannot maket this action");
		}

		mentor.transitionTo(dto.status);

		await this._mentorRepository.update(userId, mentor);
	}
}
