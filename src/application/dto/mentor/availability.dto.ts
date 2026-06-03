import { DAY_OF_WEEK } from "@domain/mentor/entities/availability.entity";
import z from "zod";

export const createAvailabilitySchema = z.object({
	startTime: z.number(),
	endTime: z.number(),
	dayOfWeek: z.enum(DAY_OF_WEEK),
});

export type createAvailabilityDto = z.infer<typeof createAvailabilitySchema>;
