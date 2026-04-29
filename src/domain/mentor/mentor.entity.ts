interface mentorProp {
	// readonly id: string;
	readonly userId: string;
	headline: string | null;
	shortBio: string | null;
	isVerified: boolean;
	domainId: string | null;
	status: MentorStatus;
	stripeAccountId: string | null;
	stripeOnboardingComplete: boolean;
	averageRating: number;
	reviewCount: number;
	readonly createdAt: Date;
	updatedAt: Date;
}

export const MentorStatus = {
	PENDING: "PENDING_REVIEW",
	ACTIVE: "ACTIVE",
	DRAFT: "DRAFT",
	PAUSED: "PAUSED",
	SUSPENDED: "SUSPENDED",
} as const;

export type MentorStatus = (typeof MentorStatus)[keyof typeof MentorStatus];
export class Mentor {
	constructor(private props: mentorProp) {}

	public static create(props: { userId: string } & Partial<mentorProp>) {
		return new Mentor({
			userId: props.userId,
			headline: props.headline ?? "",
			shortBio: props.shortBio ?? "",
			isVerified: props.isVerified || false,
			status: props.status ?? MentorStatus.PENDING,
			stripeAccountId: props.stripeAccountId ?? "",
			domainId: props.domainId || null,
			stripeOnboardingComplete: props.stripeOnboardingComplete || false,
			averageRating: props.averageRating || 0,
			reviewCount: props.reviewCount || 0,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		});
	}

	get userId() {
		return this.props.userId;
	}

	get headline() {
		return this.props.headline;
	}

	get shortBio() {
		return this.props.shortBio;
	}

	get isVerified() {
		return this.props.isVerified;
	}

	get domainId() {
		return this.props.domainId;
	}

	get status() {
		return this.props.status;
	}

	get stripeAccountId() {
		return this.props.stripeAccountId;
	}

	get stripeOnboardingComplete() {
		return this.props.stripeOnboardingComplete;
	}

	get averageRating() {
		return this.props.averageRating;
	}

	get reviewCount() {
		return this.props.reviewCount;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	verifyMentor() {
		if (this.isVerified === false) {
			this.props.isVerified = true;
		}
	}

	toPrimitive() {
		return {
			...this.props,
		};
	}
}
