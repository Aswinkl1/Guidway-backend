import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";

export interface IConfirmBookingUsecase {
	execute(config: VerifyPaymentDto): Promise<{ id: string }>;
}
