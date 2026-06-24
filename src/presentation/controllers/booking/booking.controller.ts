import type { GetBookingSetupInputDto } from "@application/dto/booking/getBookingSetup.dto";
import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import type { IGetBookingSetupDetailsUseCase } from "@application/ports/usecase/booking/IGetBookingSetupDetails.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { createSuccess } from "@presentation/helper/response.util";
import type { IBookingController } from "@presentation/interface/controllers/booking/IBookingController";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class BookingController implements IBookingController {
	constructor(
		@inject(TYPES.CreateBookingIntentUsecase)
		private readonly _createBookingIntentUsecase: ICreateBookingIntentUsecase,
		@inject(TYPES.GetBookingSetupDetailsUseCase)
		private readonly _getBookingSetupDetailsUsecase: IGetBookingSetupDetailsUseCase,
	) {}

	createBookingIntent = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		const data = req.validated?.body as HoldSlotDto;

		if (!userId) {
			throw new Error("User not found");
		}

		const result = await this._createBookingIntentUsecase.execute(userId, data);

		res
			.status(201)
			.json(createSuccess("Booking intent created successfully", result));
	};

	getBookingSetupDetails = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { mentorId, sessionId } = req.validated
			?.params as GetBookingSetupInputDto;
		const result = await this._getBookingSetupDetailsUsecase.execute({
			mentorId,
			sessionId,
		});

		res
			.status(200)
			.json(
				createSuccess("Booking setup details fetched successfully", result),
			);
	};
}
