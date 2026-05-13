import type { ToggleSessionVisibilityDTO } from "@application/dto/mentor/session.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import {
	SessionMapper,
	type SessionOutputDTO,
} from "@application/mappers/session.mapper";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { IToggleSessionVisibilityUseCase } from "@application/ports/usecase/mentor/session/IToggleSessionVisibility.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class ToggleSessionVisibilityUsecase
	implements IToggleSessionVisibilityUseCase
{
	constructor(
		@inject(TYPES.SessionRepository)
		private readonly _sessionRepository: ISessionRepository,
	) {}
	async execute(
		mentorId: string,
		dto: ToggleSessionVisibilityDTO,
	): Promise<SessionOutputDTO> {
		console.log(dto);
		const session = await this._sessionRepository.findById(dto.id);

		if (!session) {
			throw new NotFoundError("session not found");
		}
		if (session.mentorId !== mentorId) {
			throw new ForbiddenError("you dont have access to edit this resounse");
		}

		if (dto.isActive) {
			session.activate();
		} else {
			session.deactivate();
		}

		const record = await this._sessionRepository.save(dto.id, session);

		return SessionMapper.toOutput(record);
	}
}
