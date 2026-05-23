import z from "zod";

export const listMentorSchema = z.object({
	search: z.string().trim(),
	cursor: z.uuid(),
	limit: z.number().default(5),
});

export type listMentorDto = z.infer<typeof listMentorSchema>;
