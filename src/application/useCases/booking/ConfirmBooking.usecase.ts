import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IBookingIntentRepository } from "@application/ports/repository/IBookingIntent.repository";
import type { IConfirmBookingUsecase } from "@application/ports/usecase/booking/IConfirmBooking.usecase";
import { createDateTime } from "@application/utils/date.utils";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class ConfirmBookingUsecase implements IConfirmBookingUsecase {
	constructor(
		@inject(TYPES.BookingIntentRepository)
		private readonly _bookingIntentRepo: IBookingIntentRepository,
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}

	async execute(config: VerifyPaymentDto): Promise<{ id: string }> {
		const bookingDetails = await this._bookingIntentRepo.findByGatewayOrderId(
			config.gatewayOrderId,
		);
		console.log(bookingDetails);
		console.log("----------");
		console.table(bookingDetails?.session);
		console.log("----------");

		console.table(bookingDetails?.bookingIntent);
		console.log("----------");

		console.table(bookingDetails?.slot);

		if (bookingDetails === null) {
			throw new NotFoundError("booking intent not found");
		}

		if (bookingDetails.slot.isExpired()) {
			// chage this to slot expires error
			throw new ForbiddenError("slot is expired");
		}

		// check for razorpay signature
		const startTime = createDateTime(
			bookingDetails.slot.date,
			bookingDetails.slot.startTime,
		);
		const endTime = createDateTime(
			bookingDetails.slot.date,
			bookingDetails.slot.endTime,
		);
		const final = {
			...bookingDetails,
			startTime,
			endTime,
		};

		const result = await this._bookingRepository.createBookingTransaction(
			final,
			config,
		);

		return { id: result.bookingId };
	}
}
