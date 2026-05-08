import type { DeleteMentorSkillDTO } from "@application/dto/mentor/mentorSkill.dto";

export interface IDeleteMentorSkillUsecase {
	execute(mentorId: string, dto: DeleteMentorSkillDTO): Promise<void>;
}
