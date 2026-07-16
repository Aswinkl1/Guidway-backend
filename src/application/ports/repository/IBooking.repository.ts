import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";
import type {
	BookingDetailsRepoOutput,
	BookingIntentAggregate,
	BookingOwnerFilter,
	getAllBookingOutput,
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
	findAll(
		owner: BookingOwnerFilter,
		dto: getAllBookingDto,
	): Promise<Omit<getAllBookingOutput, "duration">>;
	cancelBooking(userId: string, bookingId: string): Promise<void>;
	rescheduleBooking(data: rescheduleBookingDto): Promise<{ bookingId: string }>;
}
