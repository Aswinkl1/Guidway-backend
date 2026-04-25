import { TimePeriod } from "@domain/shared/value-object/time-period.vo";
import { v4 as uuid } from "uuid";

export interface IEducation {
	id: string;
	mentorId: string;
	degree: string;
	institution: string;
	fieldOfStudy: string;
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	isCurrent: boolean;
	grade: string | null;
	description: string | null;
	deletedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateEducationProps
	extends Omit<IEducation, "id" | "createdAt" | "updatedAt" | "deletedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export class Education {
	private constructor(private props: IEducation) {}

	static create(props: CreateEducationProps) {
		TimePeriod.create({
			startMonth: props.startMonth,
			startYear: props.startYear,
			endMonth: props.endMonth,
			endYear: props.endYear,
			isCurrent: props.isCurrent,
		});

		const finalProps = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		};

		return new Education(finalProps);
	}

	get id() {
		return this.props.id;
	}
	get mentorId() {
		return this.props.mentorId;
	}
	get fieldOfStudy() {
		return this.props.fieldOfStudy;
	}
	get institution() {
		return this.props.institution;
	}
	get degree() {
		return this.props.degree;
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
	get grade() {
		return this.props.grade;
	}
	get description() {
		return this.props.description;
	}
	get deletedAt() {
		return this.props.deletedAt;
	}

	delete() {
		if (this.props.deletedAt !== null) {
			//TODO chane this to confilict error
			throw new Error("cannot delete something that is alredy deleted");
		}

		this.props.deletedAt = new Date();
	}

	update(updatedProps: Partial<Omit<Education, "id" | "mentorId">>) {
		const updated = {
			startMonth: updatedProps.startMonth
				? updatedProps.startMonth
				: this.props.startMonth,
			startYear: updatedProps.startYear
				? updatedProps.startYear
				: this.props.startYear,
			endMonth: updatedProps.endMonth
				? updatedProps.endMonth
				: this.props.endMonth,
			endYear: updatedProps.endYear ? updatedProps.endYear : this.props.endYear,
			isCurrent: updatedProps.isCurrent
				? updatedProps.isCurrent
				: this.props.isCurrent,
		};

		TimePeriod.create(updated);

		if (updatedProps.degree !== undefined)
			this.props.degree = updatedProps.degree;
		if (updatedProps.institution !== undefined)
			this.props.institution = updatedProps.institution;
		if (updatedProps.fieldOfStudy !== undefined)
			this.props.fieldOfStudy = updatedProps.fieldOfStudy;
		if (updatedProps.startMonth !== undefined)
			this.props.startMonth = updatedProps.startMonth;
		if (updatedProps.startYear !== undefined)
			this.props.startYear = updatedProps.startYear;
		if (updatedProps.endMonth !== undefined)
			this.props.endMonth = updatedProps.endMonth;
		if (updatedProps.endYear !== undefined)
			this.props.endYear = updatedProps.endYear;
		if (updatedProps.isCurrent !== undefined)
			this.props.isCurrent = updatedProps.isCurrent;
		if (updatedProps.grade !== undefined) this.props.grade = updatedProps.grade;
		if (updatedProps.description !== undefined)
			this.props.description = updatedProps.description;
	}
}
