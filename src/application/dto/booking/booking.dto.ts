import { BOOKING_STATUS } from "@domain/booking/booking.entity";
import z from "zod";

export const getAllBookingSchema = z.object({
	search: z.string().default(""),
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(5).default(5),
	status: z.enum(BOOKING_STATUS).default(BOOKING_STATUS.CONFIRMED),
});

export type getAllBookingDto = z.infer<typeof getAllBookingSchema>;
