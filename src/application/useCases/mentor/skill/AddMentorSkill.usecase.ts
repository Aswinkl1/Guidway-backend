import type {
	MentorSkillDTO,
	MentorSkillOutputDTO,
} from "@application/dto/mentor/mentorSkill.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IMentorSkillRepository } from "@application/ports/repository/IMentorSkill.repository";
import type { ISkillRepository } from "@application/ports/repository/ISkill.repository";
import type { IAddMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IAddMentorSkill.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { MentorSkillVO } from "@domain/mentor/value_object/mentor.skills.vo";
import { inject, injectable } from "inversify";

@injectable()
export class AddMentorSkillUsecase implements IAddMentorSkillUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
		@inject(TYPES.SkillRepository)
		private readonly _skillRepository: ISkillRepository,
		@inject(TYPES.MentorSkillRepository)
		private readonly _mentorSkillRepository: IMentorSkillRepository,
	) {}
	async execute(
		mentorId: string,
		dto: MentorSkillDTO,
	): Promise<MentorSkillOutputDTO> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}
		const skill = await this._skillRepository.findById(dto.skillId);

		if (!skill) {
			throw new NotFoundError("skill not found");
		}
		const skillVO = MentorSkillVO.create({ ...dto, mentorId: mentorId });
		const record = await this._mentorSkillRepository.upsert(skillVO);
		console.log("record from usecase", record);
		return {
			skillId: dto.skillId,
			name: skill.name,
			yearsExperience: dto.yearsExperience,
		};
	}
}
