import type { GetLanguagesQueryDto } from "@application/dto/mentor/language.dto";

import type { ILanguageRepository } from "@application/ports/repository/ILanguage.repository";

import { TYPES } from "@config/DI-container/TYPES";

import { Language } from "@domain/mentor/entities/language.entity";

import type {
	Prisma,
	PrismaClient,
	Language as PrismaLanguage,
} from "generated/prisma/client";

import { inject, injectable } from "inversify";

import { BaseRepository } from "./BaseRepository";

@injectable()
export class LanguageRepository
	extends BaseRepository<
		PrismaLanguage,
		Language,
		Prisma.LanguageCreateInput,
		Prisma.LanguageUpdateInput
	>
	implements ILanguageRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.language);
	}

	async findAll(filter: GetLanguagesQueryDto): Promise<Language[] | []> {
		const { search } = filter;

		const record = await this._prisma.language.findMany({
			where: search
				? {
						name: {
							contains: search,
							mode: "insensitive",
						},
					}
				: undefined,
		});

		return record.map((r) => this.toDomain(r));
	}

	protected toDomain(record: PrismaLanguage): Language {
		return Language.create(record);
	}

	protected toPersistence(
		entity: Language,
	): Omit<Prisma.LanguageCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			name: entity.name,
			code: entity.code,
		};
	}
}
