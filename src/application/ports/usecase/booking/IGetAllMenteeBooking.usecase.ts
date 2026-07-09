import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { getAllBookingOutput } from "@application/types/booking.types";

export interface IGetAllMenteeBookingUsecase {
	execute(userId: string, dto: getAllBookingDto): Promise<getAllBookingOutput>;
}
