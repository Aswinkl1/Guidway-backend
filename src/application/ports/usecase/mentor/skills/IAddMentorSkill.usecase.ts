import type {
	MentorSkillDTO,
	MentorSkillOutputDTO,
} from "@application/dto/mentor/mentorSkill.dto";

export interface IAddMentorSkillUsecase {
	execute(mentorId: string, dto: MentorSkillDTO): Promise<MentorSkillOutputDTO>;
}
