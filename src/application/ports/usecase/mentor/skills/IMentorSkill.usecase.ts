import type { MentorSkillDTO } from "@application/dto/mentor/mentorSkill.dto";

export interface IMentorSkillUsecase {
	addOrUpdateSkill(
		mentorId: string,
		dto: MentorSkillDTO,
	): Promise<MentorSkillDTO>;
}
