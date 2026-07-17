import { addReviewSchema } from "@application/dto/booking/review.dto";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import type { IReviewController } from "@presentation/interface/controllers/booking/IReview.constroller";
import { isAuthenticate } from "@presentation/middleware/isAuthentication.middleware";
import validatetor from "@presentation/middleware/validation.middleware";
import { Router } from "express";

const router = Router();
const ReviewController = container.get<IReviewController>(
	TYPES.ReviewController,
);

router.post(
	"/review",
	isAuthenticate,
	validatetor(addReviewSchema, "body"),
	ReviewController.addReview,
);

router.delete("/review", isAuthenticate, ReviewController.deleteReview);

export default router;
