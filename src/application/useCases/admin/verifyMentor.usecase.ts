import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type IVerifyMentorUsecase from "@application/ports/usecase/admin/IVerifyMentor.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { UserNotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export default class VerifyMentorUsecase implements IVerifyMentorUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
	) {}
	async execute(userId: string): Promise<void> {
		// find if the mentor exist
		const mentor = await this._mentorRepository.findMentorByUserId(userId);
		// if not error
		if (!mentor) {
			throw new UserNotFoundError("user not found");
		}

		// now change the thing to isverifed
		mentor.verifyMentor();

		// now save
		await this._mentorRepository.update(mentor.userId, mentor);
	}
}
