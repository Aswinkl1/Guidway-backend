import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";

export interface IGetSessionUsecase {
	execute(
		mentorId: string,
		dto: GetAllSessionsDTO,
	): Promise<SessionOutputDTO[]>;
}
