import z from "zod";

export const updateMentorVisibilitySchema = z.object({
	isVisbile: z.boolean(),
});

export type updateMentorVisibilityDTO = z.infer<
	typeof updateMentorVisibilitySchema
>;
