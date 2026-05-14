import type { GetAllSessionsDTO } from "@application/dto/mentor/session.dto";
import {
	SessionMapper,
	type SessionOutputDTO,
} from "@application/mappers/session.mapper";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { IGetSessionUsecase } from "@application/ports/usecase/mentor/session/IGetSession.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class GetSessionUsecase implements IGetSessionUsecase {
	constructor(
		@inject(TYPES.SessionRepository)
		private readonly _sessionRepository: ISessionRepository,
	) {}

	async execute(
		mentorId: string,
		dto: GetAllSessionsDTO,
	): Promise<SessionOutputDTO[]> {
		const records = await this._sessionRepository.findManyByMentorId(
			mentorId,
			dto,
		);
		return records.map((r) => SessionMapper.toOutput(r));
	}
}
