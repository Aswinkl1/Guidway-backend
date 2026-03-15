import { promises } from "node:dns";

export interface ITokenCache {
  saveToken(token: string, data: any, expiresInSecond: number): Promise<void>;
  getUserIdByToken(token: string): Promise<any | null>;
  deleteToken(token: string): Promise<void>;
}
