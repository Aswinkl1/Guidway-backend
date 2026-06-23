import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { DayOfWeekIndex } from "@domain/mentor/entities/availability.entity";
import { inject, injectable } from "inversify";
import { da } from "zod/locales";
@injectable()
export class CreateBookingIntentUsecase implements ICreateBookingIntentUsecase {
	constructor(
		@inject(TYPES.SlotRepository)
		private readonly _slotRepository: ISlotRepository,
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}

	async execute(
		userId: string,
		data: HoldSlotDto,
	): Promise<{ slotId: string }> {
		const dayOfWeek = DayOfWeekIndex[new Date(data.date).getDay()];
		const availability = await this._availabilityRepository.checkOverlap(
			data.mentorId,
			dayOfWeek,
			data.startTime,
			data.endTime,
		);

		if (!availability) {
			throw new Error("Requested time slot is not available.");
		}
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
