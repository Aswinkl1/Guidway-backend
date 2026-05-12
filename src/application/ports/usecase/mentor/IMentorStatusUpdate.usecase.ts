import type { MentorStatusUpdateDTO } from "@application/dto/mentor/MentorStatusUpdate.dto";

export interface IMentorStatusUpdateUsecase {
	execute(userId: string, isVisible: MentorStatusUpdateDTO): Promise<void>;
}
