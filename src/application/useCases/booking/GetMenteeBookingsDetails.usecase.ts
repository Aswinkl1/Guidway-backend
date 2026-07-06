import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetMenteeBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMenteeBookingDetails.usecase";
import type { MenteeBookingDetailsOutput } from "@application/types/booking.types";
import { Booking } from "@domain/booking/booking.entity";

export class GetMenteeBookingDetailsUsecase
	implements IGetMenteeBookingDetailsUsecase
{
	constructor(private readonly _bookingRepository: IBookingRepository) {}

	async execute(
		userId: string,
		bookingId: string,
	): Promise<MenteeBookingDetailsOutput> {
		const booking = await this._bookingRepository.findById(bookingId);
	}
}
