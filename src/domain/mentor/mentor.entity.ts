import { v4 as uuid } from "uuid";

interface mentorProp {
	readonly id: string;
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
			id: props.id ?? uuid(),
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
	toPrimitive() {
		return {
			...this.props,
		};
	}
}
