import {
	type CreateSessionDTO,
	DeleteSessionSchema,
	type editSessionDTO,
	type GetAllSessionsDTO,
	type ToggleSessionVisibilityDTO,
} from "@application/dto/mentor/session.dto";
import type { IAddSessionUsecase } from "@application/ports/usecase/mentor/session/IAddSession.usecase";
import type { IDeleteSessionUsecase } from "@application/ports/usecase/mentor/session/IDeleteSession.usecase";
import type { IEditSessionUsecase } from "@application/ports/usecase/mentor/session/IEditSession.usecase";
import type { IGetSessionUsecase } from "@application/ports/usecase/mentor/session/IGetSession.usecase";
import type { IToggleSessionVisibilityUseCase } from "@application/ports/usecase/mentor/session/IToggleSessionVisibility.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
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
		@inject(TYPES.DeleteSessionUsecase)
		private readonly _deleteSessionUsecase: IDeleteSessionUsecase,
		@inject(TYPES.ToggleSessionVisibilityUsecase)
		private readonly _toggleSessionUsecase: IToggleSessionVisibilityUseCase,
		@inject(TYPES.GetSessionUsecase)
		private readonly _getsessionUsecase: IGetSessionUsecase,
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

	deleteSession = async (req: Request, res: Response): Promise<void> => {
		const sessionId = req.params.id;
		const mentorId = req.user?.userId;

		const parsed = DeleteSessionSchema.safeParse({ id: sessionId, mentorId });
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}
		await this._deleteSessionUsecase.execute(parsed.data);
		res.status(HTTPSTATUS.NO_CONTENT).json(createSuccess("success", {}));
	};
	toggleVisibilitySession = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const parsed = req.validated?.body as ToggleSessionVisibilityDTO;
		const mentorId = req.user?.userId;

		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		const record = await this._toggleSessionUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", record));
	};
	getSession = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as GetAllSessionsDTO;
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		const record = await this._getsessionUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", record));
	};
}
