import type { getAllBookingDto } from "@application/dto/booking/booking.dto";
import { getBookingDetailsSchema } from "@application/dto/booking/bookingDetails.dto";
import type { VerifyPaymentDto } from "@application/dto/booking/confirmBooking.dto";
import type { GetBookingSetupInputDto } from "@application/dto/booking/getBookingSetup.dto";
import type { rescheduleBookingDto } from "@application/dto/booking/rescheduleBooking.dto";
import type { HoldSlotDto } from "@application/dto/booking/slotHold.dto";
import type { ICancelBookingByMentorUsecase } from "@application/ports/usecase/booking/ICancelBookingByMentor.usecase";
import type { ICancelBookingByUserUsecase } from "@application/ports/usecase/booking/ICancelBookingByUser.usecase";
import type { IConfirmBookingUsecase } from "@application/ports/usecase/booking/IConfirmBooking.usecase";
import type { ICreateBookingIntentUsecase } from "@application/ports/usecase/booking/ICreateBookingIntent.usecase";
import type { IGetAllMenteeBookingUsecase } from "@application/ports/usecase/booking/IGetAllMenteeBooking.usecase";
import type { IGetAllMentorBookingUsecase } from "@application/ports/usecase/booking/IGetAllMentorBooking.usecase";
import type { IGetBookingSetupDetailsUseCase } from "@application/ports/usecase/booking/IGetBookingSetupDetails.usecase";
import type { IGetMenteeBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMenteeBookingDetails.usecase";
import type { IGetMentorBookingDetailsUsecase } from "@application/ports/usecase/booking/IGetMentorBookingDetails.usecase";
import type { IRescheduleBookingUsecase } from "@application/ports/usecase/booking/IRescheduleBooking.usecase";
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
		@inject(TYPES.GetAllMentorBookingUsecase)
		private readonly _getAllMentorBookingUsecase: IGetAllMentorBookingUsecase,
		@inject(TYPES.CancelBookingByUserUsecase)
		private readonly _cancelBookingByUserUsecase: ICancelBookingByUserUsecase,
		@inject(TYPES.CancelBookingByMentorUsecase)
		private readonly _cancelBookingByMentorUsecase: ICancelBookingByMentorUsecase,
		@inject(TYPES.RescheduleBookingUsecase)
		private readonly _rescheduleBookingUsecase: IRescheduleBookingUsecase,
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
		console.log(parsed);
		if (!userId) {
			throw new NotFoundError("user not found");
		}

		const data = await this._getAllBookingMenteeUsecase.execute(userId, parsed);
		console.log(data);
		res.status(200).json(createSuccess("success", data));
	};

	getAllMentorBooking = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as getAllBookingDto;
		const userId = req.user?.userId;
		console.log(parsed);
		if (!userId) {
			throw new NotFoundError("user not found");
		}

		const data = await this._getAllMentorBookingUsecase.execute(userId, parsed);
		console.log(data);
		res.status(200).json(createSuccess("success", data));
	};

	cancelBookingByUser = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		if (!userId) {
			throw new NotFoundError("user not found");
		}
		const bookingId = req.params.id;

		if (!bookingId || typeof bookingId !== "string") {
			throw new NotFoundError("bookingId not found");
		}

		await this._cancelBookingByUserUsecase.execute(userId, bookingId);
		res.status(200).json(createSuccess("success", {}));
	};

	cancelBookingByMentor = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const userId = req.user?.userId;
		if (!userId) {
			throw new NotFoundError("user not found");
		}
		const bookingId = req.params.id;

		if (!bookingId || typeof bookingId !== "string") {
			throw new NotFoundError("bookingId not found");
		}

		await this._cancelBookingByMentorUsecase.execute(userId, bookingId);
		res.status(200).json(createSuccess("success", {}));
	};
	rescheduleBooking = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		if (!userId) {
			throw new NotFoundError("user not found");
		}
		const data = req.validated?.body as rescheduleBookingDto;

		const result = await this._rescheduleBookingUsecase.execute(userId, data);

		res
			.status(200)
			.json(createSuccess("Booking rescheduled successfully", result));
	};
}
