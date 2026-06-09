import type { AchievementType } from "@domain/mentor/entities/achievement.entity";
import type { EmploymentType } from "@domain/mentor/entities/experience.entity";
import type { MentorStatus } from "@domain/mentor/mentor.entity";

export interface MentorProfileDto {
	userId: string;
	name: string;
	email: string;
	profileImageKey: string | null;
	timezone: string | null;
	slotDurationMinutes: number;
	status: MentorStatus;
	isVerified: boolean;
	headline: string | null;
	shortBio: string | null;
	averageRating: number;
	reviewCount: number;
	domain: { id: string; name: string } | null;

	socialLinks: {
		// platform: SocialPlatform;
		// TODO change this to socailaplatoform from domian
		platform: string;

		url: string;
	}[];

	languages: {
		languageId: string;
		name: string;
		code: string;
		// proficiency: ProficiencyLevel;
		//TODO change this to proficiencyLevel from domain
		proficiency: string;
	}[];

	skills: {
		skillId: string;
		name: string;
		yearsExperience: number | null;
	}[];

	experiences: {
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
	}[];

	education: {
		id: string;
		institution: string;
		degree: string;
		fieldOfStudy: string;
		startMonth: number;
		startYear: number;
		endMonth: number | null;
		endYear: number | null;
		isCurrent: boolean;
		grade: string | null;
		description: string | null;
	}[];

	achievements: {
		id: string;
		title: string | null;
		type: AchievementType;
		year: number | null;
	}[];

	sessions: {
		id: string;
		name: string;
		description: string;
		price: number;
		duration: number;
	}[];
}
