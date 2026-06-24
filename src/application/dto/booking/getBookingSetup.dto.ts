import z from "zod";

export type BookingSetupDetailsOutput = {
	mentor: {
		id: string;
		name: string;
		avatarUrl?: string;
		slotDurationMinutes: number;
	};
	session: {
		id: string;
		title: string;
		duration: number;
		price: number;
	};
};

export const getBookingSetupSchema = z.object({
	mentorId: z.uuid(),
	sessionId: z.uuid(),
});

export type GetBookingSetupInputDto = z.infer<typeof getBookingSetupSchema>;
