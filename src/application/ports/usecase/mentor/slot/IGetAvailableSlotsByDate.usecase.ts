import type { SlotsVO } from "@domain/booking/slot.vo";

export interface IGetAvailableSlotsByDate {
	execute(mentorId: string, date: Date): Promise<SlotsVO[]>;
}
