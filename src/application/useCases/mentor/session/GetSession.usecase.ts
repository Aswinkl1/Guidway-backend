import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import type { SessionOutputDTO } from "@application/mappers/session.mapper";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { IGetSessionUsecase } from "@application/ports/usecase/mentor/session/IGetSession.usecase";

export class GetSessionUsecase implements IGetSessionUsecase {
	constructor(private readonly _sessionRepository: ISessionRepository) {}

	execute(
		mentorId: string,
		dto: GetAllSessionsDTO,
	): Promise<SessionOutputDTO[]> {}
}
