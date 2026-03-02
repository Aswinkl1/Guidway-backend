export interface ITokenService {
  getSecureToken(): string;
  generateAccessToken(payload: { userId: string; role: string }): string;
  generateRefreshToken(): { token: string; hash: string };
  hashToken(token: string): string;
  verifyAccessToken(token: string): { userId: string; role: string };
}
