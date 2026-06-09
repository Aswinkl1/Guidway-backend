import z from "zod";

export const UpdateMentorOverviewSchema = z.object({
	shortBio: z.string().trim().optional(),
	headline: z.string().trim().optional(),
	domainId: z.uuid(),
	slotDurationMinutes: z.number().default(30),
});

export type UpdateMentorOverviewDTO = z.infer<
	typeof UpdateMentorOverviewSchema
>;

export const UpdateMentorOverviewOutputDTO =
	UpdateMentorOverviewSchema.required({
		shortBio: true,
		headline: true,
		domainId: true,
		slotDurationMinutes: true,
	});

export type UpdateMentorOverviewOutputDTO = z.infer<
	typeof UpdateMentorOverviewOutputDTO
>;
