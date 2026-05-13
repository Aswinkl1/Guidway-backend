import type { ToggleSessionVisibilityDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";

export interface IToggleSessionVisibilityUseCase {
	execute(
		mentorId: string,
		dto: ToggleSessionVisibilityDTO,
	): Promise<SessionOutputDTO>;
}
