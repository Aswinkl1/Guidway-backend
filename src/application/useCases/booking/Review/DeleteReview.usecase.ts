import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IReviewRepository } from "@application/ports/repository/IReview.repository";
import type { IDeleteReviewUsecase } from "@application/ports/usecase/booking/Review/IDeleteReview.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";
@injectable()
export class DeleteReviewUsecase implements IDeleteReviewUsecase {
	constructor(
		@inject(TYPES.ReviewRepository)
		private readonly _reviewRepository: IReviewRepository,
	) {}

	async execute(userId: string, reviewId: string): Promise<void> {
		const review = await this._reviewRepository.findById(reviewId);
		if (!review) {
			throw new NotFoundError("reveiw not found");
		}

		if (review.userId !== userId) {
			throw new ForbiddenError("you cannot delete this resourse");
		}

		review.markAsDeleted();

		await this._reviewRepository.save(reviewId, review);
	}
}
