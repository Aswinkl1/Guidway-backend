import type { IReviewRepository } from "@application/ports/repository/IReview.repository";
import { Review } from "@domain/booking/entities/Review.entity";
import type {
	Prisma,
	PrismaClient,
	Review as PrismaReview,
} from "generated/prisma/client";
import { BaseRepository } from "./BaseRepository";

export class ReviewRepository
	extends BaseRepository<
		PrismaReview,
		Review,
		Prisma.ReviewCreateInput,
		Prisma.ReviewUpdateInput
	>
	implements IReviewRepository
{
	constructor(private readonly _prisma: PrismaClient) {
		super(_prisma.review);
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
