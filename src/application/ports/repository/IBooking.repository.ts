import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type {
	BookingDetailsRepoOutput,
	BookingIntentAggregate,
} from "@application/types/booking.types";
import type { Booking } from "@domain/booking/booking.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IBookingRepository
	extends IBaseRepository<Booking, Partial<Booking>, Partial<Booking>> {
	createBookingTransaction(
		data: BookingIntentAggregate,
		config: VerifyPaymentDto,
	): Promise<{ bookingId: string }>;
	findByIdWithUserDetails(id: string): Promise<BookingDetailsRepoOutput | null>;
}
