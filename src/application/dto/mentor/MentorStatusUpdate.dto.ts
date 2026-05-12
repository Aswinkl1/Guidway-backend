import { MentorStatus } from "@domain/mentor/mentor.entity";
import z from "zod";

export const MentorStatusUpdateSchema = z.object({
	status: z.enum(MentorStatus),
});

export type MentorStatusUpdateDTO = z.infer<typeof MentorStatusUpdateSchema>;
