import type { DeleteMentorSkillDTO } from "@application/dto/mentor/mentorSkill.dto";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IMentorSkillRepository } from "@application/ports/repository/IMentorSkill.repository";
import type { ISkillRepository } from "@application/ports/repository/ISkill.repository";
import type { IDeleteMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IDeleteMentorSkill.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteMentorSkillUsecase implements IDeleteMentorSkillUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
		@inject(TYPES.SkillRepository)
		private readonly _skillRepository: ISkillRepository,
		@inject(TYPES.MentorSkillRepository)
		private readonly _mentorSkillRepository: IMentorSkillRepository,
	) {}

	async execute(mentorId: string, dto: DeleteMentorSkillDTO): Promise<void> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);
		console.log(dto);
		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}
		const skill = await this._skillRepository.findById(dto.skillId);

		if (!skill) {
			throw new NotFoundError("skill not found");
		}
		await this._mentorSkillRepository.remove(mentorId, dto.skillId);
	}
}
