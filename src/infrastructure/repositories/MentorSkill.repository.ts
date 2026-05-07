import { create } from "node:domain";
import type { IMentorSkillRepository } from "@application/ports/repository/IMentorSkill.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { MentorSkillVO } from "@domain/mentor/value_object/mentor.skills.vo";
import type { MentorSkill, PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";

@injectable()
export class MentorSkillRepository implements IMentorSkillRepository {
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {}

	async upsert(vo: MentorSkillVO): Promise<MentorSkillVO> {
		const record = await this._prisma.mentorSkill.upsert({
			where: {
				mentorId_skillId: {
					mentorId: vo.props.mentorId,
					skillId: vo.props.skillId,
				},
			},
			create: {
				mentorId: vo.props.mentorId,
				skillId: vo.props.skillId,
				yearsExperience: vo.props.yearsExperience,
			},
			update: {
				yearsExperience: vo.props.yearsExperience,
			},
		});

		return this.toVo(record);
	}

	toVo(data: MentorSkill): MentorSkillVO {
		return MentorSkillVO.create({
			mentorId: data.mentorId,
			skillId: data.skillId,
			yearsExperience: data.yearsExperience ?? undefined,
		});
	}
	async remove(mentorId: string, skillId: string): Promise<void> {
		await this._prisma.mentorSkill.delete({
			where: { mentorId_skillId: { mentorId, skillId } },
		});
	}
}
