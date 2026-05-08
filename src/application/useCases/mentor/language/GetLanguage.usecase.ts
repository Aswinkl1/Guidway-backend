import type { GetLanguagesQueryDto } from "@application/dto/mentor/language.dto";

import {
	LanguageMapper,
	type LanguageOutputDto,
} from "@application/mappers/language.mapper";

import type { ILanguageRepository } from "@application/ports/repository/ILanguage.repository";
import type { IGetLanguagesUsecase } from "@application/ports/usecase/mentor/language/IGetLanguage.usecase";

import { TYPES } from "@config/DI-container/TYPES";

import { inject, injectable } from "inversify";

@injectable()
export class GetLanguageUsecase implements IGetLanguagesUsecase {
	constructor(
		@inject(TYPES.LanguageRepository)
		private readonly _languageRepository: ILanguageRepository,
	) {}

	async execute(dto: GetLanguagesQueryDto): Promise<LanguageOutputDto[]> {
		const record = await this._languageRepository.findAll(dto);

		return LanguageMapper.toOutputList(record);
	}
}
