import z from "zod";

export const getSlotSchema = z.object({
	date: z.coerce.date().refine(
		(date) => {
			const today = new Date();

			today.setHours(0, 0, 0, 0);
			date.setHours(0, 0, 0, 0);

			return date >= today;
		},
		{
			message: "date cannot be in the past",
		},
	),
});

export type getSlotDto = z.infer<typeof getSlotSchema>;
