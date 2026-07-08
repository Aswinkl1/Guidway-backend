import { BOOKING_STATUS } from "@domain/booking/booking.entity";
import z from "zod";

const getAllBookingSchema = z.object({
	search: z.string(),
	page: z.number(),
	limit: z.number(),
	status: z.enum(BOOKING_STATUS),
});

export type getAllBookingDto = z.infer<typeof getAllBookingSchema>;
