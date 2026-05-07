import z from "zod";

export const MentorSkillSchema = z.object({
	skillId: z.uuid(),
	yearsExperience: z.coerce.number().optional(),
});

export type MentorSkillDTO = z.infer<typeof MentorSkillSchema>;
export const DeleteMentorSkillSchema = MentorSkillSchema.omit({
	yearsExperience: true,
});
export type DeleteMentorSkillDTO = z.infer<typeof DeleteMentorSkillSchema>;
export interface MentorSkillOutputDTO {
	skillId: string;
	name: string;
	yearsExperience?: number;
}
