import { z } from "zod";

export const UpdateBookingRulesSchema = z
	.object({
		leadTimeHours: z
			.number("leadTimeHours must be a number")
			.int()
			.min(0, "leadTimeHours must be >= 0")
			.optional(),

		futureLimitDays: z
			.number("futureLimitDays must be a number")
			.int()
			.min(1, "futureLimitDays must be at least 1 day")
			.optional(),

		maxSessionsDaily: z
			.number("maxSessionsDaily must be a number")
			.int()
			.min(1, "maxSessionsDaily must be at least 1")
			.optional(),

		bufferTimeMinutes: z
			.number("bufferTimeMinutes must be a number")
			.int()
			.min(0, "bufferTimeMinutes must be >= 0")
			.optional(),

		cancellationCutoffHours: z
			.number("cancellationCutoffHours must be a number")
			.int()
			.min(0, "cancellationCutoffHours must be >= 0")
			.optional(),
	})
	.refine(
		(data) => {
			if (
				data.cancellationCutoffHours !== undefined &&
				data.leadTimeHours !== undefined
			) {
				return data.cancellationCutoffHours <= data.leadTimeHours;
			}
			return true;
		},
		{
			message: "cancellationCutoffHours cannot exceed leadTimeHours",
			path: ["cancellationCutoffHours"],
		},
	)
	.refine((data) => Object.keys(data).length > 0, {
		message: "at least one field must be provided",
	});

export type UpdateBookingRulesDTO = z.infer<typeof UpdateBookingRulesSchema>;
