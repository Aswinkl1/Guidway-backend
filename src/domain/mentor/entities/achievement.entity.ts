import { v4 as uuid } from "uuid";

export const AchievementType = {
	AWARD: "AWARD",
	CERTIFICATION: "CERTIFICATION",
	COMPETITION: "COMPETITION",
	PUBLICATION: "PUBLICATION",
	SPEAKING: "SPEAKING",
	HACKATHON_WIN: "HACKATHON_WIN",
	SCHOLARSHIP: "SCHOLARSHIP",
	WORK_RECOGNITION: "WORK_RECOGNITION",
	OTHER: "OTHER",
} as const;

export type AchievementType =
	(typeof AchievementType)[keyof typeof AchievementType];

export interface IAchievement {
	id: string;
	mentorId: string;
	title: string | null;
	type: AchievementType;
	year: number | null;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateAchievementProps
	extends Omit<IAchievement, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export class Achievement {
	private constructor(private props: IAchievement) {}

	static create(props: CreateAchievementProps): Achievement {
		if (props.year !== null && props.year !== undefined) {
			const currentYear = new Date().getFullYear();
			if (props.year < 1900 || props.year > currentYear) {
				throw new Error(`Year must be between 1900 and ${currentYear}`);
			}
		}

		const finalProps: IAchievement = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		};

		return new Achievement(finalProps);
	}

	get id() {
		return this.props.id;
	}

	get mentorId() {
		return this.props.mentorId;
	}

	get title() {
		return this.props.title;
	}

	get type() {
		return this.props.type;
	}

	get year() {
		return this.props.year;
	}

	get deletedAt() {
		return this.props.deletedAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	delete() {
		if (this.props.deletedAt !== null) {
			// TODO: change this to conflict error
			throw new Error("Cannot delete something that is already deleted");
		}

		this.props.deletedAt = new Date();
	}

	update(updatedProps: Partial<Omit<IAchievement, "id" | "mentorId">>) {
		if (updatedProps.year !== undefined && updatedProps.year !== null) {
			const currentYear = new Date().getFullYear();
			if (updatedProps.year < 1900 || updatedProps.year > currentYear) {
				throw new Error(`Year must be between 1900 and ${currentYear}`);
			}
		}

		if (updatedProps.title !== undefined) this.props.title = updatedProps.title;
		if (updatedProps.type !== undefined) this.props.type = updatedProps.type;
		if (updatedProps.year !== undefined) this.props.year = updatedProps.year;

		this.props.updatedAt = new Date();
	}
}
