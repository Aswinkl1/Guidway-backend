import { UserRepository } from "@infrastructure/repositories/UserRepository";

import { prisma } from "@infrastructure/database/prisma";

const userRepo = new UserRepository(prisma);

export { userRepo };
