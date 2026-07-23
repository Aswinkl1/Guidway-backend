import type { GetAdminBookingDetailsUsecase } from "@application/useCases/admin/getBookingDetails.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IAdminBookingManagementController } from "@presentation/interface/controllers/admin/booking.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class AdminBookingManagementController
	implements IAdminBookingManagementController
{
	constructor(
		@inject(TYPES.GetAdminBookingDetailsUsecase)
		private readonly _getAdminbookingDetailsUsecase: GetAdminBookingDetailsUsecase,
	) {}
	getBookingDetails = async (req: Request, res: Response): Promise<void> => {
		const bookingId = req.params.id;
		if (!bookingId || typeof bookingId !== "string") {
			throw new NotFoundError("booking not found");
		}

		const record = await this._getAdminbookingDetailsUsecase.execute(bookingId);
		res.status(HTTPSTATUS.OK).json(createSuccess("success", record));
	};
}
