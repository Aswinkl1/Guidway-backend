import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../src/generated/prisma/client";
import { seedDomains } from "./domain.seed";
import { seedLanguages } from "./language.seed";
import { seedSkills } from "./skills.seed";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
	console.log("🌱 Seeding domains...");
	await seedDomains(prisma);
	console.log("seeding skills");

	await seedSkills(prisma);

	console.log("languages seeding");

	await seedLanguages(prisma);
	console.log("finished seeding");
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
