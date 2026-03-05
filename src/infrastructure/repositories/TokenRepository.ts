import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { TYPES } from "@config/DI-container/TYPES";
import { AppRedisClientType } from "@infrastructure/database/redisClient";
import { inject, injectable } from "inversify";
import { RedisClientType } from "redis";

@injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @inject(TYPES.RedisClient) private _redisClient: AppRedisClientType,
  ) {}
  async saveToken(
    token: string,
    userId: string,
    expiresInSecond: number,
  ): Promise<string> {
    return await this._redisClient.setEx(token, expiresInSecond, userId);
  }
  async getUserIdByToken(token: string): Promise<string | null> {
    return await this._redisClient.get(token);
  }
  async deleteToken(token: string): Promise<void> {
    await this._redisClient.del(token);
  }
}
