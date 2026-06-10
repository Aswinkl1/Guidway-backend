import type { getSlotDto } from "@application/dto/mentor/slot.dto";
import type { ISlotResponse } from "@application/mappers/slots.mapper";
import type { SlotsVO } from "@domain/booking/slot.vo";

export interface IGetAvailableSlotsByDate {
	execute(mentorId: string, dto: getSlotDto): Promise<ISlotResponse[]>;
}
