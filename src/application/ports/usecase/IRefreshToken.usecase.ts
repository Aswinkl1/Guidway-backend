import { type Role } from '@domain/entities/user';

export interface IRefreshTokenUsecase {
  execute(token: string): Promise<{ accessToken: string; role: Role }>;
}
