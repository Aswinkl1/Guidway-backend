import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import { getBookingDetailsSchema } from "@application/dto/booking/bookingDetails.dto";
import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { GetBookingSetupInputDto } from "@application/dto/booking/getBookingSetup.dto";
import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { IConfirmBookingUsecase } from "@application/ports/usecase/booking/IConfirmBooking.usecase";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import type { IGetAllMenteeBookingUsecase } from "@application/ports/usecase/booking/IGetAllMenteeBooking.usecase";
import type { IGetBookingSetupDetailsUseCase } from "@application/ports/usecase/booking/IGetBookingSetupDetails.usecase";
import type { IGetMenteeBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMenteeBookingDetails.usecase";
import type { IGetMentorBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMentorBookingDetails.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
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
		@inject(TYPES.ConfirmBookingUsecase)
		private readonly _confirmBookingUsecase: IConfirmBookingUsecase,
		@inject(TYPES.GetMenteeBookingDetailsUsecase)
		private readonly _getMenteeBookingDetailsUsecase: IGetMenteeBookingDetailsUsecase,
		@inject(TYPES.GetMentorBookingDetailsUsecase)
		private readonly _getMentorBookingDetailsUsecase: IGetMentorBookingDetailsUsecase,
		@inject(TYPES.GetAllMenteeBookingUsecase)
		private readonly _getAllBookingMenteeUsecase: IGetAllMenteeBookingUsecase,
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

	confirmBooking = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as VerifyPaymentDto;

		const result = await this._confirmBookingUsecase.execute(parsed);

		res.status(200).json(createSuccess("success", result));
	};

	menteeBookingDetails = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;
		const userId = req.user?.userId;

		const parsed = getBookingDetailsSchema.safeParse({ userId, bookingId: id });
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}

		const data = await this._getMenteeBookingDetailsUsecase.execute(
			parsed.data,
		);

		res.status(200).json(createSuccess("success", data));
	};

	getMentorBookingDetails = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const { id } = req.params;
		const userId = req.user?.userId;

		const parsed = getBookingDetailsSchema.safeParse({ userId, bookingId: id });
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}

		const data = await this._getMentorBookingDetailsUsecase.execute(
			parsed.data,
		);

		res.status(200).json(createSuccess("success", data));
	};
	getAllMenteeBooking = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as getAllBookingDto;
		const userId = req.user?.userId;

		if (!userId) {
			throw new NotFoundError("user not found");
		}

		const data = await this._getAllBookingMenteeUsecase.execute(userId, parsed);

		res.status(200).json(createSuccess("success", data));
	};
}
