import crypto from "crypto";
import { ITokenService } from "@application/ports/services/ITokenService";

export class TokenService implements ITokenService {
  getSecureToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }
}
