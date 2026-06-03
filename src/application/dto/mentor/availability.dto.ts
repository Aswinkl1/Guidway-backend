import { DAY_OF_WEEK } from "@domain/mentor/entities/availability.entity";
import z from "zod";

export const createAvailabilitySchema = z
	.object({
		startTime: z.number().min(0).max(1439),
		endTime: z.number().min(1).max(1440),
		dayOfWeek: z.enum(DAY_OF_WEEK),
	})
	.refine((data) => data.endTime > data.startTime, {
		message: "End time must be strictly greater than start time",
		path: ["endTime"],
	});

export type createAvailabilityDto = z.infer<typeof createAvailabilitySchema>;
