import type { createAvailabilityDto } from "@application/dto/mentor/availability.dto";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IAddAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IAddAvailability.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { Availability } from "@domain/mentor/entities/availability.entity";
import { inject, injectable } from "inversify";
@injectable()
export class AddAvailabilityUsecase implements IAddAvailabilityUsecase {
	constructor(
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}
	async execute(mentorId: string, dto: createAvailabilityDto): Promise<void> {
		const overlap = await this._availabilityRepository.checkOverlap(
			mentorId,
			dto.dayOfWeek,
			dto.startTime,
			dto.endTime,
		);

		if (overlap) {
			throw new Error("conflict time overlaps");
		}
		const entity = Availability.create({ ...dto, mentorId, isActive: true });
		await this._availabilityRepository.create(entity);
	}
}
