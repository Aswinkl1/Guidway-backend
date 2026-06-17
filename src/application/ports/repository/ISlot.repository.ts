import type { Slot } from "@domain/booking/entities/slot.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISlotRepository
	extends IBaseRepository<Slot, Partial<Slot>, Partial<Slot>> {}
