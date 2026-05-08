import type { MentorProfileDto } from "@application/dto/mentor/mentor-profile.dto";
import type { IMentorQuery } from "@application/ports/queries/IMentor.query";
import { TYPES } from "@config/DI-container/TYPES";
import type { PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";
@injectable()
export class MentorQuery implements IMentorQuery {
	constructor(
		@inject(TYPES.PrismaClient)
		private readonly _prisma: PrismaClient,
	) {}
	async getProfile(userId: string): Promise<MentorProfileDto | null> {
		const record = await this._prisma.mentor.findUnique({
			where: { userId },
			include: {
				user: {
					select: {
						name: true,
						email: true,
						profileImageKey: true,
						timezone: true,
					},
				},
				domain: {
					select: {
						id: true,
						domainName: true,
					},
				},
				socialLinks: {
					select: { platform: true, url: true },
				},
				mentorLanguages: {
					include: {
						language: { select: { id: true, name: true, code: true } },
					},
				},
				mentorSkills: {
					where: { skill: { status: "ACTIVE" } },
					include: {
						skill: { select: { id: true, name: true } },
					},
				},
				experiences: {
					where: { deletedAt: null },
					orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
					select: {
						id: true,
						role: true,
						company: true,
						employmentType: true,
						startMonth: true,
						startYear: true,
						endMonth: true,
						endYear: true,
						isCurrent: true,
						description: true,
					},
				},
				education: {
					where: { deletedAt: null },
					orderBy: [{ startYear: "desc" }, { startMonth: "desc" }],
					select: {
						id: true,
						institution: true,
						degree: true,
						fieldOfStudy: true,
						startMonth: true,
						startYear: true,
						endMonth: true,
						endYear: true,
						isCurrent: true,
						grade: true,
						description: true,
					},
				},
				achievements: {
					where: { deletedAt: null },
					orderBy: { year: "desc" },
					select: {
						id: true,
						title: true,
						type: true,
						year: true,
					},
				},
			},
		});

		if (!record) return null;

		return {
			name: record.user.name,
			email: record.user.email,
			profileImageKey: record.user.profileImageKey,
			timezone: record.user.timezone,
			userId: record.userId,
			status: record.status,
			isVerified: record.isVerified,
			headline: record.headline,
			shortBio: record.shortBio,
			averageRating: record.averageRating,
			reviewCount: record.reviewCount,
			domain: record.domain
				? { id: record.domain.id, name: record.domain.domainName }
				: null,
			socialLinks: record.socialLinks.map((s) => ({
				platform: s.platform,
				url: s.url,
			})),
			languages: record.mentorLanguages.map((ml) => ({
				languageId: ml.languageId,
				name: ml.language.name,
				code: ml.language.code,
				proficiency: ml.proficiency,
			})),
			skills: record.mentorSkills.map((ms) => ({
				skillId: ms.skillId,
				name: ms.skill.name,
				yearsExperience: ms.yearsExperience,
			})),
			experiences: record.experiences.map((e) => ({
				id: e.id,
				role: e.role,
				company: e.company,
				employmentType: e.employmentType,
				startMonth: e.startMonth,
				startYear: e.startYear,
				endMonth: e.endMonth,
				endYear: e.endYear,
				isCurrent: e.isCurrent,
				description: e.description,
			})),
			education: record.education.map((e) => ({
				id: e.id,
				institution: e.institution,
				degree: e.degree,
				fieldOfStudy: e.fieldOfStudy,
				startMonth: e.startMonth,
				startYear: e.startYear,
				endMonth: e.endMonth,
				endYear: e.endYear,
				isCurrent: e.isCurrent,
				grade: e.grade,
				description: e.description,
			})),
			achievements: record.achievements.map((a) => ({
				id: a.id,
				title: a.title,
				type: a.type,
				year: a.year,
			})),
		};
	}
}
