import type { GetLanguagesQueryDto } from "@application/dto/mentor/language.dto";
import type { LanguageOutputDto } from "@application/mappers/language.mapper";

export interface IGetLanguagesUsecase {
	execute(dto: GetLanguagesQueryDto): Promise<LanguageOutputDto[]>;
}
