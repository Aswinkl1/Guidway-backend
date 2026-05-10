import z from "zod";

export const UpdateMentorOverviewSchema = z.object({
	shortBio: z.string().trim().optional(),
	headline: z.string().trim().optional(),
	domainId: z.uuid(),
});

export type UpdateMentorOverviewDTO = z.infer<
	typeof UpdateMentorOverviewSchema
>;

export const UpdateMentorOverviewOutputDTO =
	UpdateMentorOverviewSchema.required({
		shortBio: true,
		headline: true,
		domainId: true,
	});

export type UpdateMentorOverviewOutputDTO = z.infer<
	typeof UpdateMentorOverviewOutputDTO
>;
