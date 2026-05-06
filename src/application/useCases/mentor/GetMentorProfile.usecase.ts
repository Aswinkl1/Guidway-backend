import type { MentorProfileDto } from "@application/dto/mentor/mentor-profile.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IMentorQuery } from "@application/ports/queries/IMentor.query";
import type { IGetMentorProfileUsecase } from "@application/ports/usecase/mentor/IGetMentorProfile.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class GetMentorProfileUsecase implements IGetMentorProfileUsecase {
	constructor(
		@inject(TYPES.MentorQuery) private readonly _mentorQuery: IMentorQuery,
	) {}
	async execute(userId: string): Promise<MentorProfileDto | null> {
		const profile = await this._mentorQuery.getProfile(userId);

		if (profile == null) {
			throw new NotFoundError("mentor not found");
		}

		return profile;
	}
}
