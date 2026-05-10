import type { UpdateMentorOverviewDTO } from "@application/dto/mentor/updateMentorOverview.dto";

export interface IUpdateMentorOverviewUsecase {
	execute(mentorId: string, dto: UpdateMentorOverviewDTO): Promise<void>;
}
