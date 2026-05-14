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

export const GetAllSessionsSchema = z.object({
	search: z.string().optional(),
	isActive: z.coerce.boolean().optional(),
	page: z.number().int().positive().default(1),
	limit: z.number().int().positive().max(100).default(10),
});

export type GetAllSessionsDTO = z.infer<typeof GetAllSessionsSchema>;
