import type { CreateAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import type { AchievementOutputDTO } from "@application/mappers/acheivement.mapper";

export interface IAddAchievementUsecase {
	execute(
		mentorId: string,
		dto: CreateAchievementDTO,
	): Promise<AchievementOutputDTO>;
}
