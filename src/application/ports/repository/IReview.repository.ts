import type { Review } from "@domain/booking/entities/Review.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IReviewRepository
	extends IBaseRepository<Review, Partial<Review>, Partial<Review>> {}
