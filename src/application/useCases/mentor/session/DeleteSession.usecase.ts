import type { DeleteSessionDTO } from "@application/dto/mentor/session.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { ISessionRepository } from "@application/ports/repository/ISession.respository";
import type { IDeleteSessionUsecase } from "@application/ports/usecase/mentor/session/IDeleteSession.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class DeleteSessionUsecase implements IDeleteSessionUsecase {
	constructor(
		@inject(TYPES.SessionRepository)
		private readonly _sessionRepository: ISessionRepository,
	) {}
	async execute(dto: DeleteSessionDTO): Promise<void> {
		const session = await this._sessionRepository.findById(dto.id);
		if (!session) {
			throw new NotFoundError("session not found");
		}

		if (session.mentorId !== dto.mentorId) {
			throw new ForbiddenError("you dont have access to edit this resounse");
		}

		session.delete();

		await this._sessionRepository.save(session.id, session);
	}
}
