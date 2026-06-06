import type { ToggleAvailabilityDTO } from "@application/dto/mentor/availability.dto";

export interface IToggleAvailabilityUsecase {
	execute(mentorId: string, dto: ToggleAvailabilityDTO): Promise<void>;
}
