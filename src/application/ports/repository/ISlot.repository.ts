import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { Slot } from "@domain/booking/entities/slot.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISlotRepository
	extends IBaseRepository<Slot, Partial<Slot>, Partial<Slot>> {
	transactionallySaveSlotAndBookingIntent(
		data: HoldSlotDto,
	): Promise<{ slotId: string }>;
}
