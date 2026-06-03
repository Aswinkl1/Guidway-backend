import type { createAvailabilityDto } from "@application/dto/mentor/availability.dto";
import type { IAddAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IAddAvailability.usecase";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IAvailabilityController } from "@presentation/interface/controllers/mentor/IAvailability.controller";
import type { Request, Response } from "express";

export class AvailabilityController implements IAvailabilityController {
	constructor(
		private readonly _addAvailabilityUsecase: IAddAvailabilityUsecase,
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
}
