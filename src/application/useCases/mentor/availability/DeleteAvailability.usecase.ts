import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IAvailabilityRepository } from "@application/ports/repository/IAvailability.repository";
import type { IDeleteAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IDeleteAvailability.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class DeleteAvailabilityUsecase implements IDeleteAvailabilityUsecase {
	constructor(
		@inject(TYPES.AvailabilityRepository)
		private readonly _availabilityRepository: IAvailabilityRepository,
	) {}
	async execute(mentorId: string, availabilityId: string): Promise<void> {
		const record = await this._availabilityRepository.findById(availabilityId);

		if (record == null) {
			throw new NotFoundError("availability not found");
		}

		if (record.mentorId !== mentorId) {
			throw new ForbiddenError("you dont have permision to edit this");
		}

		record.delete();

		await this._availabilityRepository.save(availabilityId, record);
	}
}
