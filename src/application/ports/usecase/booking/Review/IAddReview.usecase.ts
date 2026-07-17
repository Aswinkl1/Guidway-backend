import type { addReviewDto } from "@application/dto/booking/review.dto";

export interface IAddReviewUsecase {
	execute(userId: string, dto: addReviewDto): Promise<void>;
}
