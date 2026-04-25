import z from "zod";

export const CreateEducationSchema = z.object({
	institution: z.string().trim().nonempty(),
	fieldOfStudy: z.string().trim().nonempty(),
	degree: z.string().trim().max(100),
	startMonth: z.number().int().min(1).max(12),
	startYear: z.number().int().min(1900),
	endMonth: z.number().int().min(1).max(12).nullable(),
	endYear: z.number().int().min(1900).nullable(),
	isCurrent: z.boolean(),
	grade: z.string().trim().max(20).nullable(),
	description: z.string().trim().max(500).nullable(),
});

export type CreateEducationDTO = z.infer<typeof CreateEducationSchema>;

export const EditEducationSchema = CreateEducationSchema.partial().extend({
	id: z.string().trim().nonempty(),
});

export const DeleteEducationSchema = z.object({
	id: z.uuid(),
	mentorId: z.uuid().optional(),
});

export type EditEducationDTO = z.infer<typeof EditEducationSchema>;
export type DeleteEducationDTO = z.infer<typeof DeleteEducationSchema>;
