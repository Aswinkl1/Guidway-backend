import type { ToggleAvailabilityDTO } from "@application/dto/mentor/availability.dto";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IToggleAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IToggleAvaliability.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class ToggleAvailabilityUsecase implements IToggleAvailabilityUsecase {
	constructor(
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}

	execute = async (
		mentorId: string,
		dto: ToggleAvailabilityDTO,
	): Promise<void> => {
		await this._availabilityRepository.updateStatusForEntireDay(
			mentorId,
			dto.dayOfWeek,
			dto.isActive,
		);
	};
}
