import type { getBookingDetailsDto } from "@application/dto/booking/bookingDetails.dto";
import type { MenteeBookingDetailsOutput } from "@application/types/booking.types";

export interface IGetMenteeBookingDetailsUsecase {
	execute(dto: getBookingDetailsDto): Promise<MenteeBookingDetailsOutput>;
}
