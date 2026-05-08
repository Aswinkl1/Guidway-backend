import type { DeleteMentorLanguageDTO } from "@application/dto/mentor/mentorLanguage.dto";
import type { ILanguageRepository } from "@application/ports/repository/ILanguage.repository";
import type { IMentorLanguageRepository } from "@application/ports/repository/IMentorLanguage.repository";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";

import type { IDeleteMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IDeleteMentorLanguage.usecase";

import { TYPES } from "@config/DI-container/TYPES";

import { NotFoundError } from "@domain/errors/UserError";

import { inject, injectable } from "inversify";

@injectable()
export class DeleteMentorLanguageUsecase
	implements IDeleteMentorLanguageUsecase
{
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,

		@inject(TYPES.LanguageRepository)
		private readonly _languageRepository: ILanguageRepository,

		@inject(TYPES.MentorLanguageRepository)
		private readonly _mentorLanguageRepository: IMentorLanguageRepository,
	) {}

	async execute(mentorId: string, dto: DeleteMentorLanguageDTO): Promise<void> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		const language = await this._languageRepository.findById(dto.languageId);

		if (!language) {
			throw new NotFoundError("language not found");
		}

		await this._mentorLanguageRepository.remove(mentorId, dto.languageId);
	}
}
