import type { IMentorLanguageRepository } from "@application/ports/repository/IMentorLanguage.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { MentorLanguageVO } from "@domain/mentor/value_object/mentor.language.vo";
import type { MentorLanguage, PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class MentorLanguageRepository implements IMentorLanguageRepository {
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {}

	async upsert(vo: MentorLanguageVO): Promise<MentorLanguageVO> {
		const record = await this._prisma.mentorLanguage.upsert({
			where: {
				mentorId_languageId: {
					mentorId: vo.props.mentorId,
					languageId: vo.props.languageId,
				},
			},

			create: {
				mentorId: vo.props.mentorId,
				languageId: vo.props.languageId,
				proficiency: vo.props.proficiency,
			},

			update: {
				proficiency: vo.props.proficiency,
			},
		});

		return this.toVo(record);
	}

	toVo(data: MentorLanguage): MentorLanguageVO {
		return MentorLanguageVO.create({
			mentorId: data.mentorId,
			languageId: data.languageId,
			proficiency: data.proficiency,
		});
	}

	async remove(mentorId: string, languageId: string): Promise<void> {
		await this._prisma.mentorLanguage.delete({
			where: {
				mentorId_languageId: {
					mentorId,
					languageId,
				},
			},
		});
	}
}
