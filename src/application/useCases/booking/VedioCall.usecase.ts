import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IVedioCallUsecase } from "@application/ports/usecase/booking/IVedioCall.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { BOOKING_STATUS } from "@domain/booking/booking.entity";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class VedioCallUsecase implements IVedioCallUsecase {
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}

	async execute(userId: string, bookingId: string): Promise<void> {
		const booking = await this._bookingRepository.findById(bookingId);

		if (!booking) {
			throw new NotFoundError("booking not found");
		}

		if (booking.userId !== userId || booking.mentorId !== userId) {
			throw new ForbiddenError("you dont have access to this request");
		}

		if (booking.status !== BOOKING_STATUS.CONFIRMED) {
			throw new ForbiddenError("booking is not confirmed");
		}
	}
}
