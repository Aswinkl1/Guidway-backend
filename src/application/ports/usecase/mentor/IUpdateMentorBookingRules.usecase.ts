import type { UpdateBookingRulesDTO } from "@application/dto/mentor/mentorBookingRules.dto";

export interface IUpdateMentorBookingRulesUsecase {
	execute(userId: string, dto: UpdateBookingRulesDTO): Promise<void>;
}
