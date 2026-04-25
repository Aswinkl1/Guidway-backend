import { TimePeriod } from "@domain/shared/value-object/time-period.vo";
import { v4 as uuid } from "uuid";

export const EmploymentType = {
	FULL_TIME: "FULL_TIME",
	PART_TIME: "PART_TIME",
	SELF_EMPLOYED: "SELF_EMPLOYED",
	FREELANCE: "FREELANCE",
	INTERNSHIP: "INTERNSHIP",
	CONTRACT: "CONTRACT",
} as const;

export type EmploymentType =
	(typeof EmploymentType)[keyof typeof EmploymentType];

export interface IExperience {
	id: string;
	mentorId: string;
	role: string;
	company: string;
	employmentType: EmploymentType;
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	isCurrent: boolean;
	description: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

export interface CreateExperienceProps
	extends Omit<IExperience, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export class Experience {
	private constructor(private props: IExperience) {}

	static create(props: CreateExperienceProps): Experience {
		TimePeriod.create({
			startMonth: props.startMonth,
			startYear: props.startYear,
			endMonth: props.endMonth,
			endYear: props.endYear,
			isCurrent: props.isCurrent,
		});

		const finalProps: IExperience = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		};

		return new Experience(finalProps);
	}

	get id() {
		return this.props.id;
	}
	get mentorId() {
		return this.props.mentorId;
	}
	get role() {
		return this.props.role;
	}
	get company() {
		return this.props.company;
	}
	get employmentType() {
		return this.props.employmentType;
	}
	get startMonth() {
		return this.props.startMonth;
	}
	get startYear() {
		return this.props.startYear;
	}
	get endMonth() {
		return this.props.endMonth;
	}
	get endYear() {
		return this.props.endYear;
	}
	get isCurrent() {
		return this.props.isCurrent;
	}
	get description() {
		return this.props.description;
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

	public delete(): void {
		if (this.props.deletedAt !== null) {
			// TODO: Change to a specific Conflict Error class
			throw new Error("Cannot delete an experience that is already deleted.");
		}
		this.props.deletedAt = new Date();
		this.props.updatedAt = new Date();
	}

	public update(
		updatedProps: Partial<
			Omit<IExperience, "id" | "mentorId" | "createdAt" | "updatedAt">
		>,
	): void {
		const timeData = {
			startMonth: updatedProps.startMonth ?? this.props.startMonth,
			startYear: updatedProps.startYear ?? this.props.startYear,
			endMonth:
				updatedProps.endMonth !== undefined
					? updatedProps.endMonth
					: this.props.endMonth,
			endYear:
				updatedProps.endYear !== undefined
					? updatedProps.endYear
					: this.props.endYear,
			isCurrent: updatedProps.isCurrent ?? this.props.isCurrent,
		};

		TimePeriod.create(timeData);

		if (updatedProps.role !== undefined) this.props.role = updatedProps.role;
		if (updatedProps.company !== undefined)
			this.props.company = updatedProps.company;
		if (updatedProps.employmentType !== undefined)
			this.props.employmentType = updatedProps.employmentType;
		if (updatedProps.description !== undefined)
			this.props.description = updatedProps.description;

		this.props.startMonth = timeData.startMonth;
		this.props.startYear = timeData.startYear;
		this.props.endMonth = timeData.endMonth;
		this.props.endYear = timeData.endYear;
		this.props.isCurrent = timeData.isCurrent;

		this.props.updatedAt = new Date();
	}
}
