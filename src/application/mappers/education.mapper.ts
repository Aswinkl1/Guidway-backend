import type { Education } from "@domain/mentor/entities/education.entity";

export class EducationMapper {
	static toOutput(data: Education): EducationOutputDto {
		return {
			id: data.id,

			degree: data.degree,
			grade: data.grade,
			description: data.description,
			startYear: data.startYear,
			startMonth: data.startMonth,
			endYear: data.startYear,
			endMonth: data.endMonth,
			institution: data.institution,
			fieldOfStudy: data.fieldOfStudy,
		};
	}
}

export interface EducationOutputDto {
	id: string;
	degree: string;
	grade: string | null;
	description: string | null;
	startYear: number;
	startMonth: number;
	endYear: number;
	endMonth: number | null;
	institution: string;
	fieldOfStudy: string;
}
