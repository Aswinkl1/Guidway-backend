import type { Request, Response } from "express";

export interface IReviewController {
	addReview(req: Request, res: Response): Promise<void>;
	deleteReview(req: Request, res: Response): Promise<void>;
}
