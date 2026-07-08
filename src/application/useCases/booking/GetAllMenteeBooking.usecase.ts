import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IGetAllMenteeBookingUsecase } from "@application/ports/usecase/booking/IGetAllMenteeBooking.usecase";
import type { getAllBookingOutput } from "@application/types/booking.types";

export class GetAllMenteeBookingUsecase implements IGetAllMenteeBookingUsecase {
	constructor(private readonly _bookingRepo: IBookingRepository) {}
	execute(user: string, dto: getAllBookingDto): Promise<getAllBookingOutput> {}
}
