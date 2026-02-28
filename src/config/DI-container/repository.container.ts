import { UserRepository } from "@infrastructure/repositories/UserRepository";

import { prisma } from "@infrastructure/database/prisma";
import { TokenRepository } from "@infrastructure/repositories/TokenRepository";
import { redisClient } from "@infrastructure/database/redisClient";
const userRepo = new UserRepository(prisma);
const tokenRepo = new TokenRepository(redisClient);
export { userRepo, tokenRepo };
