import { z } from "zod";

export const CreateSessionSchema = z.object({
	name: z.string().min(1, "Name is required").max(100),
	duration: z.number().int().positive("Duration must be a positive number"),
	description: z.string().min(1, "Description is required").max(1000),
	isActive: z.boolean().default(true),
	price: z.number(),
});

export type CreateSessionDTO = z.infer<typeof CreateSessionSchema>;
