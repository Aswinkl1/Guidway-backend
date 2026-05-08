import type { MentorProfileDto } from "@application/dto/mentor/mentor-profile.dto";

export interface IGetMentorProfileUsecase {
	execute(userId: string): Promise<MentorProfileDto | null>;
}
