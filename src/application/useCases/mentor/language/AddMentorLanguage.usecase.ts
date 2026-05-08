import type {
	MentorLanguageDTO,
	MentorLanguageOutputDTO,
} from "@application/dto/mentor/mentorLanguage.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { ILanguageRepository } from "@application/ports/repository/ILanguage.repository";
import type { IMentorLanguageRepository } from "@application/ports/repository/IMentorLanguage.repository";

import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";

import type { IAddMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IAddMentorLanguage.usecase";

import { TYPES } from "@config/DI-container/TYPES";

import { MentorLanguageVO } from "@domain/mentor/value_object/mentor.language.vo";

import { inject, injectable } from "inversify";

@injectable()
export class AddMentorLanguageUsecase implements IAddMentorLanguageUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,

		@inject(TYPES.LanguageRepository)
		private readonly _languageRepository: ILanguageRepository,

		@inject(TYPES.MentorLanguageRepository)
		private readonly _mentorLanguageRepository: IMentorLanguageRepository,
	) {}

	async execute(
		mentorId: string,
		dto: MentorLanguageDTO,
	): Promise<MentorLanguageOutputDTO> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		const language = await this._languageRepository.findById(dto.languageId);

		if (!language) {
			throw new NotFoundError("language not found");
		}

		const languageVO = MentorLanguageVO.create({
			...dto,
			mentorId,
		});

		await this._mentorLanguageRepository.upsert(languageVO);

		return {
			languageId: dto.languageId,
			name: language.name,
			proficiency: dto.proficiency,
		};
	}
}
