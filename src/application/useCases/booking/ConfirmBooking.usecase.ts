import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { IBookingIntentRepository } from "@application/ports/repository/IBookingIntent.repository";
import type { IConfirmBookingUsecase } from "@application/ports/usecase/booking/IConfirmBooking.usecase";

export class ConfirmBookingUsecase implements IConfirmBookingUsecase {
	constructor(private readonly _bookingIntentRepo: IBookingIntentRepository) {}

	execute(config: VerifyPaymentDto): Promise<{ id: string }> {}
}
