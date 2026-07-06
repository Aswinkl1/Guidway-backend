import z from "zod";

export const getBookingDetailsSchema = z.object({
	userId: z.uuid(),
	bookingId: z.uuid(),
});

export type getBookingDetailsDto = z.infer<typeof getBookingDetailsSchema>;
