import type { GetBookingSetupInputDto } from "@application/dto/booking/getBookingSetup.dto";
import type { BookingSetupDetailsOutput } from "@application/types/booking.types";

export interface IGetBookingSetupDetailsUseCase {
	execute(data: GetBookingSetupInputDto): Promise<BookingSetupDetailsOutput>;
}
