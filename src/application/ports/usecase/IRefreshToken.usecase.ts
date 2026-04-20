import type { Role } from "@domain/user/user";

export interface IRefreshTokenUsecase {
	execute(token: string): Promise<{ accessToken: string; role: Role }>;
}
