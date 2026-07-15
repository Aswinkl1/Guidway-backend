import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";

export interface IRescheduleBookingUsecase {
	execute(
		userId: string,
		data: rescheduleBookingDto,
	): Promise<{ bookingId: string }>;
}
