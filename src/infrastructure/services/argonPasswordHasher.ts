import * as argon2 from "argon2";

import { IPasswordHasher } from "@application/ports/services/IPasswordHasher";

export class ArgonPasswordHasher implements IPasswordHasher {
  hash(plainText: string): Promise<string> {
    return argon2.hash(plainText);
  }
  compare(plainText: string, hash: string): Promise<Boolean> {
    return argon2.verify(hash, plainText);
  }
}
