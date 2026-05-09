import type { User } from "@domain/user/user";

export interface UserProfileOutputDTO {
	id: string;
	email: string;
	name: string;
	PhoneNumber: string | null;
	profileImageUrl: string | null;
	timeZone: string | null;
	isVerified: boolean;
	isBlocked: boolean;
}

export class UserProfileMapper {
	static toOutputDto(user: User): UserProfileOutputDTO {
		return {
			id: user.id,
			email: user.email,
			isBlocked: user.isBlocked,
			isVerified: user.isVerified,
			name: user.name,
			PhoneNumber: user.phoneNumber,
			profileImageUrl: user.profileImageKey,
			timeZone: user.timezone,
		};
	}
}
