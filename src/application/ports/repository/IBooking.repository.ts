import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { BookingIntentAggregate } from "@application/types/booking.types";
import type { Booking } from "@domain/booking/booking.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IBookingRepository
	extends IBaseRepository<Booking, Partial<Booking>, Partial<Booking>> {
	createBookingTransaction(
		data: BookingIntentAggregate,
		config: VerifyPaymentDto,
	): Promise<void>;
}
