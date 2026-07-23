import type { AdminBookingDetailsOutput } from "@application/types/booking.types";

export interface IGetAdminBookingDetailsUsecase {
	execute(bookingId: string): Promise<AdminBookingDetailsOutput>;
}
