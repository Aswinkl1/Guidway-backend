import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import type { IBookingController } from "@presentation/interface/controllers/booking/IBookingController";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class BookingController implements IBookingController {
	constructor(
		@inject(TYPES.CreateBookingIntentUsecase)
		private readonly _createBookingIntentUsecase: ICreateBookingIntentUsecase,
	) {}

	createBookingIntent = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		const data = req.validated?.body as HoldSlotDto;

		if (!userId) {
			throw new Error("User not found");
		}

		const result = await this._createBookingIntentUsecase.execute(userId, data);

		res.status(201).json({
			message: "Booking intent created successfully",
			slotId: result.slotId,
		});
	};
}
