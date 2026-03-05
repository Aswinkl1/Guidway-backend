import crypto from "crypto";
import { ITokenService } from "@application/ports/services/ITokenService";
import jwt from "jsonwebtoken";
import { JWTTokenPaylod } from "@application/types/JWTTokenPayload.type";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
import { EnvConfig } from "@config/env";
@injectable()
export class TokenService implements ITokenService {
  private accessSecret: string;
  private accessExpiresIn: string;
  constructor() {
    this.accessSecret = EnvConfig.JWT_ACCESSTOKEN_SECRET;
    this.accessExpiresIn = EnvConfig.JWT_ACCESSTOKEN_EXPIRES_IN;
  }
  getSecureToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  generateAccessToken(payload: { userId: string; role: string }): string {
    return jwt.sign(
      { sub: payload.userId, role: payload.role },
      this.accessSecret,
      { expiresIn: this.accessExpiresIn } as jwt.SignOptions,
    );
  }

  generateRefreshToken(): { token: string; hash: string } {
    const token = this.getSecureToken();
    const hash = this.hashToken(token);
    return { token, hash };
  }

  hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  verifyAccessToken(token: string): JWTTokenPaylod {
    try {
      const decode = jwt.verify(token, this.accessSecret) as any;
      return { id: decode.sub, role: decode.role };
    } catch (error) {
      throw new Error("invalid token ");
    }
  }
}
