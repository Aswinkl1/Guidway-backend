import { EmploymentType } from "@domain/mentor/entities/experience.entity";
import z from "zod";

export const CreateExperienceSchema = z.object({
	role: z
		.string()
		.trim()
		.min(2, "Role must be at least 2 characters")
		.max(100, "Role is too long"),
	company: z
		.string()
		.trim()
		.min(2, "Company must be at least 2 characters")
		.max(100, "Company name is too long"),
	employmentType: z.enum(EmploymentType),
	startMonth: z
		.number()
		.int()
		.min(1, "Month must be between 1 and 12")
		.max(12, "Month must be between 1 and 12"),
	// We still keep the basic bounds check so the domain isn't handed completely absurd numbers
	startYear: z
		.number()
		.int()
		.min(1950, "Year must be 1950 or later")
		.max(new Date().getFullYear(), "Start year cannot be in the future"),

	endMonth: z.number().int().min(1).max(12).nullable(),
	endYear: z
		.number()
		.int()
		.min(1950)
		.max(new Date().getFullYear() + 5)
		.nullable(),

	isCurrent: z.boolean().default(false),
	description: z
		.string()
		.trim()
		.max(1000, "Description cannot exceed 1000 characters")
		.nullable(),
});

export type CreateExperiencedto = z.infer<typeof CreateExperienceSchema>;

export const EditExperienceSchema = CreateExperienceSchema.partial().extend({
	id: z.string().trim().nonempty(),
});

export const DeleteExperienceSchema = z.object({
	id: z.uuid(),
	mentorId: z.uuid().optional(),
});

export type EditExperienceDTO = z.infer<typeof EditExperienceSchema>;
export type DeleteExperienceDTO = z.infer<typeof DeleteExperienceSchema>;
