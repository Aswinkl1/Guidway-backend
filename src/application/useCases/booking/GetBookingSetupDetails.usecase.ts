import type { GetBookingSetupInputDto } from "@application/dto/booking/getBookingSetup.dto";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IGetBookingSetupDetailsUseCase } from "@application/ports/usecase/booking/IGetBookingSetupDetails.usecase";
import type { BookingSetupDetailsOutput } from "@application/types/booking.types";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class GetBookingSetupDetailsUseCase
	implements IGetBookingSetupDetailsUseCase
{
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly mentorRepo: IMentorRepository,
	) {}

	async execute(
		data: GetBookingSetupInputDto,
	): Promise<BookingSetupDetailsOutput> {
		const result = await this.mentorRepo.getMentorWithSession(
			data.mentorId,
			data.sessionId,
		);

		if (!result) {
			throw new NotFoundError("Mentor or session not found");
		}

		return result;
	}
}
