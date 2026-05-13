import type {
	CreateSessionDTO,
	editSessionDTO,
} from "@application/dto/mentor/session.dto";
import type { IAddSessionUsecase } from "@application/ports/usecase/mentor/session/IAddSession.usecase";
import type { IEditSessionUsecase } from "@application/ports/usecase/mentor/session/IEditSession.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { ISessionController } from "@presentation/interface/controllers/ISession.controller";
import type { Request, Response } from "express";
import { inject } from "inversify";

export class SessionController implements ISessionController {
	constructor(
		@inject(TYPES.AddSessionUsecase)
		private readonly _addSessionUsecase: IAddSessionUsecase,
		@inject(TYPES.EditSessionUsecase)
		private readonly _editSessionUsecase: IEditSessionUsecase,
	) {}

	addSession = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as CreateSessionDTO;
		const mentorId = req.user?.userId;

		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}
		const record = await this._addSessionUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.CREATED).json(createSuccess("success", record));
	};

	editSession = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as editSessionDTO;
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		const record = await this._editSessionUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", record));
	};
}
