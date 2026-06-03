import type { createAvailabilityDto } from "@application/dto/mentor/availability.dto";

export interface IAddAvailabilityUsecase {
	execute(mentorId: string, dto: createAvailabilityDto): Promise<void>;
}
