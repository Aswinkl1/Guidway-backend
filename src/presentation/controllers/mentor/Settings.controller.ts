import type { MentorStatusUpdateDTO } from "@application/dto/mentor/MentorStatusUpdate.dto";
import type { UpdateBookingRulesDTO } from "@application/dto/mentor/mentorBookingRules.dto";
import type { ChangePasswordDTO } from "@application/dto/user/changePassword.dto";
import type { IChangePasswordUsecase } from "@application/ports/usecase/mentor/IChangePassword.usecase";
import type { IMentorStatusUpdateUsecase } from "@application/ports/usecase/mentor/IMentorStatusUpdate.usecase";
import type { IUpdateMentorBookingRulesUsecase } from "@application/ports/usecase/mentor/IUpdateMentorBookingRules.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { ISettingsController } from "@presentation/interface/controllers/ISettings.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class SettingController implements ISettingsController {
	constructor(
		@inject(TYPES.UpdateMentorBookingRulesUsecase)
		private readonly _mentorBookingRulesUsecase: IUpdateMentorBookingRulesUsecase,
		@inject(TYPES.MentorStatusUpdateUsecase)
		private readonly _mentorStatusUpdateUsecase: IMentorStatusUpdateUsecase,
		@inject(TYPES.ChangePasswordUsecase)
		private readonly _changePasswordUsecase: IChangePasswordUsecase,
	) {}

	updateMentorBookingRules = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const parsed = req.validated?.body as UpdateBookingRulesDTO;
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		await this._mentorBookingRulesUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("siccess", {}));
	};

	updateMentorStatus = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as MentorStatusUpdateDTO;
		const mentorId = req.user?.userId;

		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		await this._mentorStatusUpdateUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", {}));
	};

	resetPassword = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as ChangePasswordDTO;
		const userId = req.user?.userId;

		if (!userId) {
			throw new NotFoundError("mentor id not found");
		}

		await this._changePasswordUsecase.execute(userId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("succss", {}));
	};
}
