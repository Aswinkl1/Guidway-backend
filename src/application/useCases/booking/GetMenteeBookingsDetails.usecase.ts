import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetMenteeBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMenteeBookingDetails.usecase";
import type { MenteeBookingDetailsOutput } from "@application/types/booking.types";
import { formatDuration } from "@application/utils/time.utils";
import { Booking } from "@domain/booking/booking.entity";
import { NotFoundError } from "@domain/errors/UserError";

export class GetMenteeBookingDetailsUsecase
	implements IGetMenteeBookingDetailsUsecase
{
	constructor(private readonly _bookingRepository: IBookingRepository) {}

	async execute(
		userId: string,
		bookingId: string,
	): Promise<MenteeBookingDetailsOutput> {
		const booking = await this._bookingRepository.findById(bookingId);

		if (!booking) {
			throw new NotFoundError("booking with this it not found");
		}

		if (booking?.userId !== userId) {
			throw new ForbiddenError("you dont have access to this booking ");
		}

		const record = await this._bookingRepository.findByIdWithUserDetails(
			booking.id,
		);

		if (!record) {
			throw new NotFoundError("booking with this id is not found ");
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
				name: record.mentor.name,
				profileImageKey: record.mentor.profileImageKey,
			},
		};
	}
}
