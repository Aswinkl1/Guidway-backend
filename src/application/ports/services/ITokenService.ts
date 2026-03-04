import { JWTTokenPaylod } from "@application/types/JWTTokenPayload.type";

export interface ITokenService {
  getSecureToken(): string;
  generateAccessToken(payload: { userId: string; role: string }): string;
  generateRefreshToken(): { token: string; hash: string };
  hashToken(token: string): string;
  verifyAccessToken(token: string): JWTTokenPaylod;
}
