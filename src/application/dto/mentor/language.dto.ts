import { z } from "zod";

export const GetLanguagesQueryDto = z.object({
	search: z.string().trim().min(1, "Search cannot be empty").optional(),
});

export type GetLanguagesQueryDto = z.infer<typeof GetLanguagesQueryDto>;
