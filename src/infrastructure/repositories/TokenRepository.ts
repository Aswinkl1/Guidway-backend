import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { redisClient } from "@infrastructure/database/redisClient";
export class TokenRepository implements ITokenRepository {
  async saveToken(
    token: string,
    userId: string,
    expiresInSecond: number,
  ): Promise<string> {
    return await redisClient.setEx(token, expiresInSecond, userId);
  }
  async getUserIdByToken(token: string): Promise<string | null> {
    return await redisClient.get(token);
  }
  async deleteToken(token: string): Promise<void> {
    await redisClient.del(token);
  }
}
