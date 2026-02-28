import * as argon2 from "argon2";

import { IHashService } from "@application/ports/services/IHashService";

export class ArgonPasswordHasher implements IHashService {
  async hash(plainText: string): Promise<string> {
    return argon2.hash(plainText);
  }
  async compare(plainText: string, hash: string): Promise<Boolean> {
    return argon2.verify(hash, plainText);
  }
}
