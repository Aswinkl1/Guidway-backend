import type { addReviewDto } from "@application/dto/booking/review.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import type { IBookingRepository } from "@application/ports/repository/IBooking.repository";
import type { IReviewRepository } from "@application/ports/repository/IReview.repository";
import type { IAddReviewUsecase } from "@application/ports/usecase/booking/Review/IAddReview.usecase";
import { Review } from "@domain/booking/entities/Review.entity";
import { NotFoundError } from "@domain/errors/UserError";

export class AddReviewUsecase implements IAddReviewUsecase {
	constructor(
		private readonly _bookingRepository: IBookingRepository,
		private readonly _reviewRepository: IReviewRepository,
	) {}

	async execute(userId: string, dto: addReviewDto): Promise<void> {
		const booking = await this._bookingRepository.findById(dto.bookingId);

		if (!booking) {
			throw new NotFoundError("booking not found");
		}

		if (booking.userId !== userId) {
			throw new ForbiddenError("you cannot add review to this booking");
		}
		const review = Review.create({
			...dto,
			userId,
			comment: dto.comment ?? null,
		});

		await this._reviewRepository.create(review);
	}
}
