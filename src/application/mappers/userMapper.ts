import { type User } from '@domain/entities/user';

export interface UserResponseDTO {
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
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class UserMapper {
  static toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profileImageUrl: user.profileImageUrl,
      timezone: user.timezone,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      isBlocked: user.isBlocked,
    };
  }
}
