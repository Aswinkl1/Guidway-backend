import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { getAllBookingOutput } from "@application/types/booking.types";

export interface IGetAllMenteeBookingUsecase {
	execute(user: string, dto: getAllBookingDto): Promise<getAllBookingOutput>;
}
