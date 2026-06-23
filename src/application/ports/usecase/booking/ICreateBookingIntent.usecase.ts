import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";

export interface ICreateBookingIntentUsecase {
	execute(userId: string, data: HoldSlotDto): Promise<{ slotId: string }>;
}
