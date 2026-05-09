import { z } from "zod";

export const GetDomainQueryDto = z.object({
	search: z.string().trim().min(1, "Search cannot be empty").optional(),
});

export type GetDomainQueryDto = z.infer<typeof GetDomainQueryDto>;
