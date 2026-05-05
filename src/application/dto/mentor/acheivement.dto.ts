import { AchievementType } from "@domain/mentor/entities/achievement.entity";
import z from "zod";

export const CreateAchievementSchema = z.object({
	title: z.string().trim().nonempty().nullable(),
	type: z.enum(AchievementType),
	year: z.number().int().min(1900).max(new Date().getFullYear()).nullable(),
});

export type CreateAchievementDTO = z.infer<typeof CreateAchievementSchema>;

export const EditAchievementSchema = CreateAchievementSchema.partial().extend({
	id: z.uuid(),
});

export type EditAchievementDTO = z.infer<typeof EditAchievementSchema>;

export const DeleteAchievementSchema = z.object({
	id: z.uuid(),
	mentorId: z.uuid(),
});

export type DeleteAchievementDTO = z.infer<typeof DeleteAchievementSchema>;
