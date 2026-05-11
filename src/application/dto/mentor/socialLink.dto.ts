import { z } from "zod";

export const CreateSocialLinkSchema = z.object({
	links: z
		.url({ message: "Invalid URL" })
		.array()
		.min(1, { message: "At least one link is required" })
		.max(5, { message: "Maximum 5 links allowed" }),
});

export type CreateSocialLinkDTO = z.infer<typeof CreateSocialLinkSchema>;
