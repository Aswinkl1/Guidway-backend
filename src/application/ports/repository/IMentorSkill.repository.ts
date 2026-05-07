import type { MentorSkillVO } from "@domain/mentor/value_object/mentor.skills.vo";

export interface IMentorSkillRepository {
	upsert(vo: MentorSkillVO): Promise<MentorSkillVO>;
	remove(mentorId: string, skillId: string): Promise<void>;
}
