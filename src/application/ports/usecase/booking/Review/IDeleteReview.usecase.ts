export interface IDeleteReviewUsecase {
	execute(userid: string, reviewId: string): Promise<void>;
}
