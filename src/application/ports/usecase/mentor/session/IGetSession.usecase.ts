import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";
import type { PaginatedResult } from "@application/types/paginationResult.types";

export interface IGetSessionUsecase {
	execute(
		mentorId: string,
		dto: GetAllSessionsDTO,
	): Promise<PaginatedResult<SessionOutputDTO>>;
}
