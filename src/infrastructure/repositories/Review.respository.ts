import type { IReviewRepository } from "@application/ports/repository/IReview.repository";
import { TYPES } from "@config/DI-container/TYPES";
import { Review } from "@domain/booking/entities/Review.entity";
import type {
	Prisma,
	PrismaClient,
	Review as PrismaReview,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";
@injectable()
export class ReviewRepository
	extends BaseRepository<
		PrismaReview,
		Review,
		Prisma.ReviewCreateInput,
		Prisma.ReviewUpdateInput
	>
	implements IReviewRepository
{
	constructor(
		@inject(TYPES.PrismaClient) private readonly _prisma: PrismaClient,
	) {
		super(_prisma.review);
	}

	async findByBookingId(id: string): Promise<Review | null> {
		const record = await this._prisma.review.findFirst({
			where: { bookingId: id },
		});
		if (!record) {
			return null;
		}
		return this.toDomain(record);
	}
	protected toDomain(record: PrismaReview): Review {
		return Review.create(record);
	}

	protected toPersistence(
		entity: Partial<Review>,
	): Omit<Prisma.ReviewCreateInput, "createdAt" | "updatedAt"> {
		return {
			id: entity.id,
			booking: { connect: { id: entity.bookingId } },
			mentor: { connect: { userId: entity.mentorId } },
			rating: entity.rating ?? 1,
			user: { connect: { id: entity.userId } },
			comment: entity.comment,
			deletedAt: entity.deletedAt,
		};
	}
}
