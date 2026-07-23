import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IRescheduleBookingUsecase } from "@application/ports/usecase/booking/IRescheduleBooking.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { ConflictError } from "@domain/errors/ConflictError";
import { NotFoundError } from "@domain/errors/UserError";
import { DayOfWeekIndex } from "@domain/mentor/entities/availability.entity";
import { inject, injectable } from "inversify";
@injectable()
export class RescheduleBookingUsecase implements IRescheduleBookingUsecase {
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly bookingRepository: IBookingRepository,
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}
	async execute(
		userId: string,
		data: rescheduleBookingDto,
	): Promise<{ bookingId: string }> {
		const booking = await this.bookingRepository.findById(data.bookingId);

		if (!booking) {
			throw new NotFoundError("Booking not found");
		}

		const dayOfWeek = DayOfWeekIndex[new Date(data.date).getDay()];

		const availability = await this._availabilityRepository.checkOverlap(
			booking.mentorId,
			dayOfWeek,
			data.startTime,
			data.endTime,
		);

		if (!availability) {
			throw new ConflictError("Mentor is unavailable for the requested time");
		}

		if (booking.userId !== userId && booking.mentorId !== userId) {
			throw new ForbiddenError("Unauthorized to reschedule this booking");
		}

		const currentSlotDuration =
			(booking.endTime.getTime() - booking.startTime.getTime()) / (1000 * 60);
		// Duration in minutes
		const newSlotDuration = Math.floor(data.endTime - data.startTime);
		console.log("currentSlotDuration", currentSlotDuration);
		console.log("newSlotDuration", newSlotDuration);
		if (currentSlotDuration !== newSlotDuration) {
			throw new ConflictError(
				"New slot duration must match the original slot duration",
			);
		}

		const result = await this.bookingRepository.rescheduleBooking(data, userId);

		return result;
	}
}
