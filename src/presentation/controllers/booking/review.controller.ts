import type { addReviewDto } from "@application/dto/booking/review.dto";
import type { IAddReviewUsecase } from "@application/ports/usecase/booking/Review/IAddReview.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IReviewController } from "@presentation/interface/controllers/booking/IReview.constroller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class ReviewController implements IReviewController {
	constructor(
		@inject(TYPES.AddReviewUsecase)
		private readonly _addReviewUsecase: IAddReviewUsecase,
	) {}

	addReview = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		const parsed = req.validated?.body as addReviewDto;

		if (!userId) {
			throw new NotFoundError("user not found");
		}

		await this._addReviewUsecase.execute(userId, parsed);

		res
			.status(HTTPSTATUS.CREATED)
			.json(createSuccess("succesfully created review", {}));
	};

	deleteReview = async (req: Request, res: Response): Promise<void> => {};
}
