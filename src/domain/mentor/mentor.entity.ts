interface mentorProp {
	id: string;
	userId: string;
	headline: string | null;
	shortBio: string;
	isVerified: boolean;
	status: string;
	stripeAccountId: string;
	stripeOnboardingComplete: boolean;
	averageRating: number;
	reviewCount: number;
	createdAt: Date;
	updatedAt: Date;
}

export class Mentor {
	constructor(private props: mentorProp) {}

	toPrimitive() {
		return {
			...this.props,
		};
	}
}
