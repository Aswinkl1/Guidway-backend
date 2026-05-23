import { MentorStatus } from "@domain/mentor/mentor.entity";
import z from "zod";

export const BaseListMentorSchema = z.object({
	search: z.string().trim().optional(),
	cursor: z.uuid().optional(),
	limit: z.number().optional().default(5),
	domainId: z.uuid().optional(),
	status: z.enum(MentorStatus).optional(),
	isVerified: z.boolean().optional(),
});

export type listMentorDto = z.infer<typeof BaseListMentorSchema>;

export const publicListMentorSchema = BaseListMentorSchema.pick({
	cursor: true,
	domainId: true,
	limit: true,
	search: true,
});

export type publicListMentorDto = z.infer<typeof publicListMentorSchema>;
