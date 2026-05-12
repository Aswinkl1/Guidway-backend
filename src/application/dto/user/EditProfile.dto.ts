import z from "zod";

export const EditUserProfileSchema = z.object({
	name: z.string(),
	phoneNumber: z.string(),
	timezone: z.string(),
});

export type editProfileDTO = z.infer<typeof EditUserProfileSchema>;
