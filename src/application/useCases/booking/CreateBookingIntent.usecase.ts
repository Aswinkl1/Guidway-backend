import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject } from "inversify";

export class CreateBookingIntentUsecase implements ICreateBookingIntentUsecase {
	constructor(
		@inject(TYPES.SlotRepository)
		private readonly _slotRepository: ISlotRepository,
	) {}

	async execute(
		userId: string,
		data: HoldSlotDto,
	): Promise<{ slotId: string }> {
		const slot = await this._slotRepository.checkOverlap(
			data.mentorId,
			data.date,
			data.startTime,
			data.endTime,
		);

		if (slot) {
			throw new Error("Requested time slot overlaps with an existing booking.");
		}

		const result =
			await this._slotRepository.transactionallySaveSlotAndBookingIntent(
				userId,
				data,
			);

		return result;
	}
}
