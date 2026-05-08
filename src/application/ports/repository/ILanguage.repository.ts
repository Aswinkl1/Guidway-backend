import type { GetLanguagesQueryDto } from "@application/dto/mentor/mentorLanguage.dto";
import type { Language } from "@domain/mentor/entities/language.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ILanguageRepository
	extends IBaseRepository<Language, Partial<Language>, Partial<Language>> {
	findAll(filter: GetLanguagesQueryDto): Promise<Language[] | []>;
}
