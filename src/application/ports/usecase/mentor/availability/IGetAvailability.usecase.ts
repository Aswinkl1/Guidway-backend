import type { GetAvailabilityPayload } from "@application/mappers/availability.mapper";

export interface IGetAvailabilityUsecase {
	execute(mentorId: string): Promise<GetAvailabilityPayload[]>;
}
