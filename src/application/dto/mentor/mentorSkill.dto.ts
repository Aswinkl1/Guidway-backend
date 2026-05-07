import z from "zod";

const MentorSkillSchema = z.object({
	skillId: z.string().trim(),
	yearsExperience: z.coerce.number().optional(),
});

export type MentorSkillDTO = z.infer<typeof MentorSkillSchema>;

export interface MentorSkillOutputDTO {
	skillId: string;
	name: string;
	yearsExperience: number | null;
}
