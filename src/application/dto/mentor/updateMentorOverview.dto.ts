import z from "zod";

export const UpdateMentorOverviewSchema = z.object({
	shortBio: z.string().trim().optional(),
	headline: z.string().trim().optional(),
	domainId: z.uuid(),
});

export type UpdateMentorOverviewDTO = z.infer<
	typeof UpdateMentorOverviewSchema
>;
