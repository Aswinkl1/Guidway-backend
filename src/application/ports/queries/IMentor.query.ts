import type { MentorProfileDto } from "@application/dto/mentor/mentor-profile.dto";

export interface IMentorQuery {
	getProfile(userId: string): Promise<MentorProfileDto | null>;
}
