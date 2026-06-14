import { EnvConfig } from "@config/env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${EnvConfig.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

export const connectPrisma = async (): Promise<void> => {
	await prisma.$connect();
};
