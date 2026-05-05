import type { AchievementOutputDTO } from "@application/mappers/acheivement.mapper";

export interface IAddAchievementUsecase {
	execute(mentorId: string, dto: any): Promise<AchievementOutputDTO>;
}
