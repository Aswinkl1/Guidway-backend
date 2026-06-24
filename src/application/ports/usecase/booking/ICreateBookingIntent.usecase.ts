import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { CreateOrderResponse } from "@application/types/PaymentService.types";

export interface ICreateBookingIntentUsecase {
	execute(userId: string, data: HoldSlotDto): Promise<CreateOrderResponse>;
}
