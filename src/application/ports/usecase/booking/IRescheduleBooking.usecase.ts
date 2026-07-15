import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";

export interface IRescheduleBookingUsecase {
	execute(data: rescheduleBookingDto): Promise<{ bookingId: string }>;
}
