import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetAllMenteeBookingUsecase } from "@application/ports/usecase/booking/IGetAllMenteeBooking.usecase";
import type { getAllBookingOutput } from "@application/types/booking.types";
import { formatDuration } from "@application/utils/time.utils";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class GetAllMenteeBookingUsecase implements IGetAllMenteeBookingUsecase {
	constructor(
		@inject(TYPES.BookingRepository)
		private readonly _bookingRepo: IBookingRepository,
	) {}
	async execute(
		userId: string,
		dto: getAllBookingDto,
	): Promise<getAllBookingOutput> {
		const records = await this._bookingRepo.findAll({ userId }, dto);

		records.data = records.data.map((v) => {
			return {
				...v,
				duration: formatDuration(v.startTime, v.endTime),
			};
		});

		return records;
	}
}
