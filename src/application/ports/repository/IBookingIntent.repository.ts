import type { BookingIntent } from "@domain/booking/entities/bookingIntent.entity";

export interface IBookingIntentRepository {
	create(data: BookingIntent): Promise<BookingIntent>;
	findBySlotId(slotId: string): Promise<BookingIntent | null>;
	save(slotId: string, data: Partial<BookingIntent>): Promise<BookingIntent>;

	findByGatewayOrderId(gatewayOrderId: string): Promise<BookingIntent | null>;

	deleteBySlotId(slotId: string): Promise<void>;
}
