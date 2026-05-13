import { z } from "zod";

export const CreateSessionSchema = z.object({
	name: z.string().min(1, "Name is required").max(100),
	duration: z.number().int().positive("Duration must be a positive number"),
	description: z.string().min(1, "Description is required").max(1000),
	isActive: z.boolean().default(true),
	price: z.number(),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>;

export const editSessionSchema = CreateSessionSchema.partial().extend({
	id: z.uuid(),
});
export const DeleteSessionSchema = z.object({
	id: z.uuid(),
	mentorId: z.uuid().optional(),
});

export const ToggleSessionVisibilitySchema = z.object({
	id: z.uuid(),
	isActive: z.boolean(),
});

export type ToggleSessionVisibilityDTO = z.infer<
	typeof ToggleSessionVisibilitySchema
>;

export type editSessionDTO = z.infer<typeof editSessionSchema>;
export type DeleteSessionDTO = z.infer<typeof DeleteSessionSchema>;
