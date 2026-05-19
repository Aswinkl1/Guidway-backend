import {
	type ISettingOutputDTO,
	SettingsMapper,
} from "@application/mappers/mentorSettings.mapper";
import type { IMentorBookingRulesRepository } from "@application/ports/repository/IMentorBookingRules.repositoty";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IGetSettingsUsecase } from "@application/ports/usecase/mentor/IGetSetting.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class GetSettingsUsecase implements IGetSettingsUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly mentorRepository: IMentorRepository,
		@inject(TYPES.MentorBookingRulesRepository)
		private readonly bookingRulesRepository: IMentorBookingRulesRepository,
	) {}
	async execute(mentorId: string): Promise<ISettingOutputDTO> {
		const mentor = await this.mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		const bookingRules =
			await this.bookingRulesRepository.findByUserId(mentorId);

		if (!bookingRules) {
			throw new NotFoundError("booking rules not found for the mentor");
		}
		return SettingsMapper.toOutput({ mentor, BookingRules: bookingRules });
	}
}
