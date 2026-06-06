import type { createAvailabilityDto } from "@application/dto/mentor/availability.dto";
import type { IAddAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IAddAvailability.usecase";
import type { IGetAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IGetAvailability.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IAvailabilityController } from "@presentation/interface/controllers/mentor/IAvailability.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class AvailabilityController implements IAvailabilityController {
	constructor(
		@inject(TYPES.AddAvailabilityUsecase)
		private readonly _addAvailabilityUsecase: IAddAvailabilityUsecase,
		@inject(TYPES.GetAvailabilityUsecase)
		private readonly _getAvailabilityUsecase: IGetAvailabilityUsecase,
	) {}
	addAvalilability = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		const parsed = req.validated?.body as createAvailabilityDto;
		if (!mentorId) {
			throw new Error("mentor not found");
		}

		await this._addAvailabilityUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.CREATED).json(createSuccess("success", {}));
	};
	getAllAvailability = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new Error("mentor not found");
		}
		console.log("heieei");
		const data = await this._getAvailabilityUsecase.execute(mentorId);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", data));
	};
}
