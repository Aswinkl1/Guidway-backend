import type {
	MentorSkillDTO,
	MentorSkillOutputDTO,
} from "@application/dto/mentor/mentorSkill.dto";

export interface IMentorSkillUsecase {
	addOrUpdateSkill(
		mentorId: string,
		dto: MentorSkillDTO,
	): Promise<MentorSkillOutputDTO>;
}
