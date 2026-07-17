import { v4 as uuid } from "uuid";

export interface IReview {
	id: string;
	bookingId: string;
	mentorId: string;
	userId: string;
	rating: number;
	comment: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export interface CreateReviewProps
	extends Omit<IReview, "createdAt" | "updatedAt" | "deletedAt" | "id"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export class Review {
	private constructor(private props: IReview) {}

	static create(props: CreateReviewProps) {
		return new Review({
			...props,
			// Default to null if not provided
			id: props.id ?? uuid(),
			comment: props.comment ?? null,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		});
	}

	get id() {
		return this.props.id;
	}

	get bookingId() {
		return this.props.bookingId;
	}

	get mentorId() {
		return this.props.mentorId;
	}

	get userId() {
		return this.props.userId;
	}

	get rating() {
		return this.props.rating;
	}

	get comment() {
		return this.props.comment;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get deletedAt() {
		return this.props.deletedAt;
	}

	markAsDeleted() {
		this.props.deletedAt = new Date();
		this.touch();
	}

	get isDeleted() {
		return this.props.deletedAt !== null;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
