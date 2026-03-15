import { Role } from "generated/prisma/enums";

export interface IRefreshTokenUsecase {
  execute(token: string): Promise<{ accessToken: string; role: Role }>;
}
