import type { Achievement } from "@domain/mentor/entities/achievement.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IAchievementRepository
	extends IBaseRepository<
		Achievement,
		Partial<Achievement>,
		Partial<Achievement>
	> {}
