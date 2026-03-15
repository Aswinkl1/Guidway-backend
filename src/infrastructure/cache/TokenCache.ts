import { ITokenCache } from "@application/ports/repository/ITokenRepository";
import { ICacheService } from "@application/ports/cache/ICache";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class TokenCache implements ITokenCache {
  constructor(@inject(TYPES.CacheService) private _cache: ICacheService) {}
  async saveToken(
    token: string,
    userId: string,
    expiresInSecond: number,
  ): Promise<void> {
    await this._cache.set({
      key: token,
      value: userId,
      ttlInSeconds: expiresInSecond,
    });
  }
  async getUserIdByToken(token: string): Promise<string | null> {
    return await this._cache.get(token);
  }
  async deleteToken(token: string): Promise<void> {
    await this._cache.delete(token);
  }
}
