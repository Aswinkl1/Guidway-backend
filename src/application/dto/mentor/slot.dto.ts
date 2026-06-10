import z from "zod";

export const getSlotSchema = z.object({
	date: z.coerce.date().refine((date) => date >= new Date(), {
		message: "date cannot be in the past",
	}),
});

export type getSlotDto = z.infer<typeof getSlotSchema>;
