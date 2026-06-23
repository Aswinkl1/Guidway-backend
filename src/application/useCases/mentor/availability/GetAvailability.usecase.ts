import {
	AvailabilityMapper,
	type GetAvailabilityPayload,
} from "@application/mappers/availability.mapper";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IGetAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IGetAvailability.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class GetAvailabilityUsecase implements IGetAvailabilityUsecase {
	constructor(
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}
	async execute(mentorId: string): Promise<GetAvailabilityPayload[]> {
		const records = await this._availabilityRepository.findAll(mentorId);

		return AvailabilityMapper.toResponse(records);
	}
}
