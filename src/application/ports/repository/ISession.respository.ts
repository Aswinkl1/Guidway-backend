import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import type { PaginatedResult } from "@application/types/paginationResult.types";
import type { Session } from "@domain/session/session.entitiy";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISessionRepository
	extends IBaseRepository<Session, Partial<Session>, Partial<Session>> {
	findManyByMentorId(
		mentorId: string,
		filter: GetAllSessionsDTO,
	): Promise<PaginatedResult<Session>>;
}
