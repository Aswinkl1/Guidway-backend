import { z } from "zod";

export const GetSkillsQueryDto = z.object({
	search: z.string().trim().min(1, "Search cannot be empty").optional(),
});

export type GetSkillsQueryDto = z.infer<typeof GetSkillsQueryDto>;
