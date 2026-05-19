import type { EditAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import type { AchievementOutputDTO } from "@application/mappers/acheivement.mapper";

export interface IEditAchievementUsecase {
	execute(
		mentorId: string,
		dto: EditAchievementDTO,
	): Promise<AchievementOutputDTO>;
}
