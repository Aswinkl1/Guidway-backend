import type { CreateSessionDTO } from "@application/dto/mentor/session.dto";
import {
	SessionMapper,
	type SessionOutputDTO,
} from "@application/mappers/session.mapper";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { IAddSessionUsecase } from "@application/ports/usecase/mentor/session/IAddSession.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { Session } from "@domain/session/session.entitiy";
import { inject, injectable } from "inversify";
@injectable()
export class AddSessionUsecase implements IAddSessionUsecase {
	constructor(
		@inject(TYPES.MentorRepository)
		private readonly _mentorRepository: IMentorRepository,
		@inject(TYPES.SessionRepository)
		private readonly _sessionRepository: ISessionRepository,
	) {}
	async execute(
		mentorId: string,
		dto: CreateSessionDTO,
	): Promise<SessionOutputDTO> {
		const mentor = await this._mentorRepository.findMentorByUserId(mentorId);

		if (!mentor) {
			throw new NotFoundError("mentor not found");
		}

		const sessionEntity = Session.create({ ...dto, mentorId });

		const record = await this._sessionRepository.create(sessionEntity);

		return SessionMapper.toOutput(record);
	}
}
