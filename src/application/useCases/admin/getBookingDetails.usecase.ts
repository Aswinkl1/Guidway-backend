import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetAdminBookingDetailsUsecase } from "@application/ports/usecase/admin/IGetBookingDetails.usecase";
import type { AdminBookingDetailsOutput } from "@application/types/booking.types";
import { formatDuration } from "@application/utils/time.utils";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class GetAdminBookingDetailsUsecase
	implements IGetAdminBookingDetailsUsecase
{
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}
	async execute(bookingId: string): Promise<AdminBookingDetailsOutput> {
		const record =
			await this._bookingRepository.findByIdWithUserDetails(bookingId);

		if (!record) {
			throw new NotFoundError("booking not found");
		}
		return {
			amount: record.amount,
			currency: record.currency,
			duration: formatDuration(record.startTime, record.endTime),
			startDateTime: record.startTime,
			endDateTime: record.endTime,
			id: record.id,
			mentorId: record.mentorId,
			note: record.note,
			sessionTitle: record.sessionTitle,
			status: record.status,
			userId: record.userId,
			user: {
				name: record.user.name,
				profileImageKey: record.user.profileImageKey,
			},
			mentor: {
				name: record.mentor.name,
				profileImageKey: record.mentor.profileImageKey,
			},
			bookingEvent: record.bookingEvent,

			review: record.review,
		};
	}
}
