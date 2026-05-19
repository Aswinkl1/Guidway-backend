import type { DeleteAchievementDTO } from "@application/dto/mentor/acheivement.dto";

export interface IDeleteAchievementUsecase {
	execute(dto: DeleteAchievementDTO): Promise<void>;
}
