import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { ICancelBookingByMentorUsecase } from "@application/ports/usecase/booking/ICancelBookingByMentor.usecase";
import { ConflictError } from "@domain/errors/ConflictError";
import { NotFoundError } from "@domain/errors/UserError";

export class CancelBookingByMentorUsecase
	implements ICancelBookingByMentorUsecase
{
	constructor(private readonly bookingRepository: IBookingRepository) {}
	async execute(mentorId: string, bookingId: string): Promise<void> {
		const booking = await this.bookingRepository.findById(bookingId);
		if (!booking) {
			throw new NotFoundError("booking not found");
		}
		if (booking.mentorId !== mentorId) {
			throw new ForbiddenError("You are not authorized to cancel this booking");
		}

		const CANCELLATION_WINDOW_MS = 24 * 60 * 60 * 1000;

		const cancellationDeadline = new Date(Date.now() + CANCELLATION_WINDOW_MS);

		if (booking.startTime < cancellationDeadline) {
			throw new ConflictError(
				"Bookings can only be cancelled at least 24 hours before the session starts",
			);
		}

		return this.bookingRepository.cancelBooking(mentorId, bookingId);
	}
}
