import type { Booking } from "@domain/booking/booking.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IBookingRepository
	extends IBaseRepository<Booking, Partial<Booking>, Partial<Booking>> {}
