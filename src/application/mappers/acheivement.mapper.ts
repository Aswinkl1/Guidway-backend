import type {
	Achievement,
	AchievementType,
} from "@domain/mentor/entities/achievement.entity";

export interface AchievementOutputDTO {
	id: string;
	mentorId: string;
	title: string | null;
	type: AchievementType;
	year: number | null;
	deletedAt: Date | null;
}

export class AchievementMapper {
	static toOutput(data: Achievement): AchievementOutputDTO {
		return {
			id: data.id,
			mentorId: data.mentorId,
			title: data.title,
			type: data.type,
			year: data.year,
			deletedAt: data.deletedAt,
		};
	}
}
