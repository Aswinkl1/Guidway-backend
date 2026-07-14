import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { ICancelBookingByUserUsecase } from "@application/ports/usecase/booking/ICancelBookingByUser.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class CancelBookingByUserUsecase implements ICancelBookingByUserUsecase {
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}
	async execute(userId: string, bookingId: string): Promise<void> {
		await this._bookingRepository.cancelBooking(userId, bookingId);
	}
}
