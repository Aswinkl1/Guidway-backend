import type { Language } from "@domain/mentor/entities/language.entity";

export interface LanguageOutputDto {
	id: string;
	name: string;
	code: string;
}

export class LanguageMapper {
	static toOutput(data: Language): LanguageOutputDto {
		return {
			id: data.id,
			name: data.name,
			code: data.code,
		};
	}

	static toOutputList(data: Language[]): LanguageOutputDto[] {
		return data.map(LanguageMapper.toOutput);
	}
}
