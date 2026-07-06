import type { MenteeBookingDetailsOutput } from "@application/types/booking.types";
import { Booking } from "@domain/booking/booking.entity";

export interface IGetMenteeBookingDetailsUsecase {
	execute(
		userId: string,
		bookingId: string,
	): Promise<MenteeBookingDetailsOutput>;
}
