import type {
	EmploymentType,
	Experience,
} from "@domain/mentor/entities/experience.entity";

export interface ExperienceOutputDto {
	id: string;
	role: string;
	company: string;
	employmentType: EmploymentType;
	startMonth: number;
	startYear: number;
	endMonth: number | null;
	endYear: number | null;
	isCurrent: boolean;
	description: string | null;
}

export class ExperienceMapper {
	static toOutput(data: Experience): ExperienceOutputDto {
		return {
			id: data.id,
			role: data.role,
			company: data.company,
			employmentType: data.employmentType,
			startMonth: data.startMonth,
			startYear: data.startYear,
			endMonth: data.endMonth,
			endYear: data.endYear,
			isCurrent: data.isCurrent,
			description: data.description,
		};
	}
}
