import type {
	createAvailabilityDto,
	ToggleAvailabilityDTO,
} from "@application/dto/mentor/availability.dto";
import type { getSlotDto } from "@application/dto/mentor/slot.dto";
import type { IAddAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IAddAvailability.usecase";
import type { IDeleteAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IDeleteAvailability.usecase";
import type { IGetAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IGetAvailability.usecase";
import type { IToggleAvailabilityUsecase } from "@application/ports/usecase/mentor/availability/IToggleAvaliability.usecase";
import type { IGetAvailableSlotsByDate } from "@application/ports/usecase/mentor/slot/IGetAvailableSlotsByDate.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
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
		@inject(TYPES.DeleteAvailabilityUsecase)
		private readonly _deleteAvailabiltyUsecase: IDeleteAvailabilityUsecase,
		@inject(TYPES.ToggleAvailabilityUsecase)
		private readonly _toggleAvailabilityUsecase: IToggleAvailabilityUsecase,
		@inject(TYPES.GetAvailableSlotsByDate)
		private readonly _getAvailableSlotsByDate: IGetAvailableSlotsByDate,
	) {}
	addAvalilability = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		const parsed = req.validated?.body as createAvailabilityDto;
		if (!mentorId) {
			throw new NotFoundError("mentor not found");
		}

		await this._addAvailabilityUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.CREATED).json(createSuccess("success", {}));
	};
	getAllAvailability = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor not found");
		}
		console.log("heieei");
		const data = await this._getAvailabilityUsecase.execute(mentorId);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", data));
	};
	deleteAvailablity = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		const availabilityId = req.params.id;
		if (!mentorId) {
			throw new NotFoundError("mentor not found");
		}
		if (!availabilityId || typeof availabilityId !== "string") {
			throw new NotFoundError("idnot found");
		}

		await this._deleteAvailabiltyUsecase.execute(mentorId, availabilityId);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", {}));
	};

	toggleAvailability = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor not found");
		}

		const parsed = req.validated?.body as ToggleAvailabilityDTO;

		await this._toggleAvailabilityUsecase.execute(mentorId, parsed);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", {}));
	};

	getSlotsByDate = async (req: Request, res: Response) => {
		const { mentorId } = req.params;
		if (!mentorId || typeof mentorId !== "string") {
			throw new NotFoundError("mentor not found");
		}

		const parsed = req.validated?.query as getSlotDto;

		const slots = await this._getAvailableSlotsByDate.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", slots));
	};
}
