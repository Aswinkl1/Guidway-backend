import { z } from "zod";

export const VerifyMentorSchema = z.object({
	mentorId: z.string().nonempty(),
});

export type VerifyMentorDto = z.infer<typeof VerifyMentorSchema>;
