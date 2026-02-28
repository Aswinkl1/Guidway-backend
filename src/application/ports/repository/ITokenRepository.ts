import { promises } from "node:dns";

export interface ITokenRepository {
  saveToken(
    token: string,
    userId: string,
    expiresInSecond: number,
  ): Promise<string>;
  getUserIdByToken(token: string): Promise<string | null>;
  deleteToken(token: string): Promise<void>;
}
