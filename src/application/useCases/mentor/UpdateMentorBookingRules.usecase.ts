import type { UpdateBookingRulesDTO } from "@application/dto/mentor/mentorBookingRules.dto";
import type { IMentorBookingRulesRepository } from "@application/ports/repository/IMentorBookingRules.repositoty";
import type { IUpdateMentorBookingRulesUsecase } from "@application/ports/usecase/mentor/IUpdateMentorBookingRules.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateMentorBookingRulesUsecase
	implements IUpdateMentorBookingRulesUsecase
{
	constructor(
		@inject(TYPES.MentorBookingRulesRepository)
		private readonly _mentorBookingRulesRepository: IMentorBookingRulesRepository,
	) {}
	async execute(userId: string, dto: UpdateBookingRulesDTO): Promise<void> {
		const record =
			await this._mentorBookingRulesRepository.findByUserId(userId);
		console.log(record);
		if (!record) {
			throw new NotFoundError("id not found");
		}

		const updatedRecord = record.update(dto);

		await this._mentorBookingRulesRepository.upsert(updatedRecord);
	}
}
