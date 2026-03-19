import { type JWTTokenPaylod } from '@application/types/JWTTokenPayload.type';

export interface ITokenService {
  getSecureToken(): string;
  generateAccessToken(payload: { userId: string; role: string }): string;
  generateRefreshToken(payload: { userId: string; role: string }): {
    token: string;
  };
  hashToken(token: string): string;
  verifyAccessToken(token: string): JWTTokenPaylod;
  verifyRefreshToken(token: string): JWTTokenPaylod;
  getVerifyToken(userId: string): string;
  verifyVerificationToken(token: string): { id: string };
}

//
