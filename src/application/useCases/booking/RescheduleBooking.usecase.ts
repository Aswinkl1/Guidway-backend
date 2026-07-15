import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IRescheduleBookingUsecase } from "@application/ports/usecase/booking/IRescheduleBooking.usecase";
import { NotFoundError } from "@domain/errors/UserError";

export class RescheduleBookingUsecase implements IRescheduleBookingUsecase {
	constructor(private readonly bookingRepository: IBookingRepository) {}
	async execute(
		userId: string,
		data: rescheduleBookingDto,
	): Promise<{ bookingId: string }> {
		const booking = await this.bookingRepository.findById(data.bookingId);

		if (!booking) {
			throw new NotFoundError("Booking not found");
		}
		if (booking.userId !== userId && booking.mentorId !== userId) {
			throw new ForbiddenError("Unauthorized to reschedule this booking");
		}

		const result = await this.bookingRepository.rescheduleBooking(data);

		return result;
	}
}
