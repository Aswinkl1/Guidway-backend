import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { Slot } from "@domain/booking/entities/slot.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISlotRepository
	extends IBaseRepository<Slot, Partial<Slot>, Partial<Slot>> {
	transactionallySaveSlotAndBookingIntent(
		userId: string,
		data: HoldSlotDto,
	): Promise<{ slotId: string }>;

	checkOverlap(
		mentorId: string,
		date: Date,
		requestStartTime: number,
		requestEndTime: number,
	): Promise<Slot | null>;

	findBookedAndLockedSlotsByMentorIdAndDate(
		mentorId: string,
		date: Date,
	): Promise<{ startTime: number; endTime: number }[]>;
}
