import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { ICancelBookingByUserUsecase } from "@application/ports/usecase/booking/ICancelBookingByUser.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class CancelBookingByUserUsecase implements ICancelBookingByUserUsecase {
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}
	async execute(userId: string, bookingId: string): Promise<void> {
		const booking = await this._bookingRepository.findById(bookingId);

		if (!booking) {
			throw new NotFoundError("Booking not found");
		}

		if (booking.userId !== userId) {
			throw new ForbiddenError("You are not authorized to cancel this booking");
		}
		await this._bookingRepository.cancelBooking(userId, bookingId);
	}
}
