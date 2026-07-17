import type { getBookingDetailsDto } from "@application/dto/booking/bookingDetails.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetMenteeBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMenteeBookingDetails.usecase";
import type { MenteeBookingDetailsOutput } from "@application/types/booking.types";
import { formatDuration } from "@application/utils/time.utils";
import { TYPES } from "@config/DI-container/TYPES";

import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class GetMenteeBookingDetailsUsecase
	implements IGetMenteeBookingDetailsUsecase
{
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepository: IBookingRepository,
	) {}

	async execute(
		dto: getBookingDetailsDto,
	): Promise<MenteeBookingDetailsOutput> {
		const record = await this._bookingRepository.findByIdWithUserDetails(
			dto.bookingId,
		);
		if (!record) {
			throw new NotFoundError("booking with this it not found");
		}

		if (record?.userId !== dto.userId) {
			throw new ForbiddenError("you dont have access to this booking ");
		}

		console.log("this is reord ", record);

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

			review: record.review,
		};
	}
}
