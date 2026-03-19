import crypto from 'crypto';
import { ITokenService } from '@application/ports/services/ITokenService';
import jwt from 'jsonwebtoken';
import { JWTTokenPaylod } from '@application/types/JWTTokenPayload.type';
import { injectable } from 'inversify';
import { EnvConfig } from '@config/env';
import { UnAuthenticatedError } from '@application/errors/UnAuthenticatedError';

@injectable()
export class TokenService implements ITokenService {
  private accessSecret: string;
  private accessExpiresIn: string;
  private verifyExpiresIn: string;
  private verifySecret: string;
  constructor() {
    this.accessSecret = EnvConfig.JWT_ACCESSTOKEN_SECRET;
    this.accessExpiresIn = EnvConfig.JWT_ACCESSTOKEN_EXPIRES_IN;
    this.verifyExpiresIn = EnvConfig.JWT_VERIFYTOKEN_EXPIRES_IN;
    this.verifySecret = EnvConfig.JWT_VERIFYTOKEN_SECRET;
  }

  verifyRefreshToken(token: string): JWTTokenPaylod {
    try {
      const decode = jwt.verify(token, this.accessSecret) as {
        sub: string;
        role: JWTTokenPaylod['role'];
      };
      return { id: decode.sub, role: decode.role };
    } catch {
      throw new UnAuthenticatedError('token expired');
    }
  }
  getSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  generateAccessToken(payload: { userId: string; role: string }): string {
    return jwt.sign({ sub: payload.userId, role: payload.role }, this.accessSecret, {
      expiresIn: this.accessExpiresIn,
    } as jwt.SignOptions);
  }

  generateRefreshToken(payload: { userId: string; role: string }): {
    token: string;
  } {
    const token = jwt.sign({ sub: payload.userId, role: payload.role }, this.accessSecret, {
      expiresIn: '7d',
    } as jwt.SignOptions);

    return { token };
  }

  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  verifyAccessToken(token: string): JWTTokenPaylod {
    try {
      const decode = jwt.verify(token, this.accessSecret);
      if (typeof decode !== 'string' && decode?.sub && decode?.role) {
        return { id: decode.sub, role: decode.role };
      }
      throw new UnAuthenticatedError('token expired');
    } catch (error: unknown) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnAuthenticatedError('token expired');
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnAuthenticatedError('invalid token');
      }
      throw error;
    }
  }

  getVerifyToken(userId: string): string {
    return jwt.sign({ sub: userId }, this.verifySecret, {
      expiresIn: this.verifyExpiresIn,
    } as jwt.SignOptions);
  }

  verifyVerificationToken(token: string): { id: string } {
    try {
      const decode = jwt.verify(token, this.accessSecret);
      if (typeof decode !== 'string' && decode?.userId) {
        return { id: decode.userId };
      }
      throw new Error('invalid token');
    } catch {
      throw new Error('invalid token');
    }
  }
}
