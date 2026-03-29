import { z } from "zod";

export const updateBlockStatusSchema = z.object({
	userId: z.string().nonempty(),
	newBlockStatus: z.boolean(),
});

export type updateBlockStatusDto = z.infer<typeof updateBlockStatusSchema>;
