import z from "zod";

export const CreateEducationSchema = z.object({
	institution: z.string().nonempty(),
	fieldOfStudy: z.string().nonempty(),
	degree: z.string().max(100),
	startMonth: z.number().int().min(1).max(12),
	startYear: z.number().int().min(1900),
	endMonth: z.number().int().min(1).max(12).nullable(),
	endYear: z.number().int().min(1900).nullable(),
	isCurrent: z.boolean(),
	grade: z.string().max(20).nullable(),
	description: z.string().max(500).nullable(),
});

export type CreateEducationDTO = z.infer<typeof CreateEducationSchema>;
