import type { outputType } from "@application/ports/repository/IMentorRepository";
import { Role, type User } from "@domain/user/user";

export interface UserOutputDTO {
	id: string;
	email: string;
	name: string;
	role: string;
	phoneNumber: string | null;
	profileImageUrl: string | null;
	timezone: string | null;
	isVerified: boolean;
	createdAt: Date;
	isBlocked: boolean;

	mentorId: string | null;
	mentorIsVerified: boolean | null; // ← from mentor table (admin verified)
	mentorStatus: string | null;
	averageRating: number | null;
}
export interface MentorProfileDTO {
	// mentor table
	id: string;
	headline: string | null;
	shortBio: string | null;
	status: string;
	isVerified: boolean; // ← mentor admin verified
	averageRating: number;
	reviewCount: number;

	// user table
	userId: string;
	user: {
		name: string;
		email: string;
		profileImageKey: string | null;
		phoneNumber: string;
		isBlocked: boolean;
		isVerified: boolean;
	};
	createdAt: Date;
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserMapper {
	static toResponseDTO(user: User): UserOutputDTO {
		return {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			phoneNumber: user.phoneNumber,
			profileImageUrl: user.profileImageKey,
			timezone: user.timezone,
			isVerified: user.isVerified,
			createdAt: user.createdAt,
			isBlocked: user.isBlocked,
			mentorId: null,
			mentorIsVerified: null,
			mentorStatus: null,
			averageRating: null,
		};
	}

	static MentorToResponseDTO(data: outputType): UserOutputDTO {
		return {
			id: data.mentor.userId,
			name: data.user.name,
			email: data.user.email,
			role: Role.MENTOR,
			isBlocked: data.user.isBlocked,
			profileImageUrl: data.user.profileImageKey,
			phoneNumber: data.user.phoneNumber,
			createdAt: data.mentor.createdAt,
			isVerified: data.user.isVerified,
			timezone: null,
			// mentor specific
			mentorId: data.mentor.id,
			mentorIsVerified: data.mentor.isVerified,
			mentorStatus: data.mentor.status,
			averageRating: data.mentor.averageRating,
		};
	}
}
