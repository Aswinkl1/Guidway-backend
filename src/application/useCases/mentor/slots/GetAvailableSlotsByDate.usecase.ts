import type { getSlotDto } from "@application/dto/mentor/slot.dto";
import {
	type ISlotResponse,
	SlotsMapper,
} from "@application/mappers/slots.mapper";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { ISlotRepository } from "@application/ports/repository/ISlot.repository";
import type { IGetAvailableSlotsByDate } from "@application/ports/usecase/mentor/slot/IGetAvailableSlotsByDate.usecase";
import { SlotGenerationService } from "@application/services/slotGenration.service";
import { getDayOfWeek, toUTCMidnight } from "@application/utils/date.utils";
import { TYPES } from "@config/DI-container/TYPES";
import type { SlotsVO } from "@domain/booking/slot.vo";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class GetAvailableSlotsByDate implements IGetAvailableSlotsByDate {
	constructor(
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepo: IAvailabilityRepository,
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
		@inject(TYPES.SlotRepository)
		private readonly _slotRepository: ISlotRepository,
	) {}
	async execute(mentorId: string, dto: getSlotDto): Promise<ISlotResponse[]> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);
		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}
		const day = getDayOfWeek(dto.date);

		const { availability, slotDuration } =
			await this._availabilityRepo.getAvailabilityAndSessionDuration(
				mentorId,
				day,
			);
		console.log(availability);
		if (availability.length === 0) {
			return [];
		}
		const date = toUTCMidnight(dto.date);
		console.log("date", date);
		const bookedSlots =
			await this._slotRepository.findBookedAndLockedSlotsByMentorIdAndDate(
				mentorId,
				date,
			);
		console.log("bookedSlots", bookedSlots);

		const slots = SlotGenerationService.generate(availability, slotDuration);

		return SlotsMapper.toResponse(slots);
	}
}
