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
}

export interface CreateEducationProps extends Omit<IEducation, "id"> {
	id?: string;
}

export class Education {
	private constructor(private props: IEducation) {}

	static create(props: CreateEducationProps) {
		const currentYear = new Date().getFullYear();

		if (props.startYear !== null && props.startYear > currentYear) {
			throw Error("Start year cannot be in the future");
		}

		if (
			props.startYear !== null &&
			props.endYear !== null &&
			props.endYear < props.startYear
		) {
			throw new Error("End year cannot be before start year");
		}

		if (props.isCurrent && props.endYear !== null) {
			throw new Error("Current education cannot have an end date");
		}

		return new Education({ ...props, id: props.id ?? uuid() });
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
}
