import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client"; // match your output path

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// =============================================================
// DOMAINS
// =============================================================

const domains = [
	{ domainName: "Software Engineering" },
	{ domainName: "Frontend Development" },
	{ domainName: "Backend Development" },
	{ domainName: "Mobile Development" },
	{ domainName: "DevOps & Cloud" },
	{ domainName: "Data Science & Analytics" },
	{ domainName: "Machine Learning & AI" },
	{ domainName: "Cybersecurity" },
	{ domainName: "Product Management" },
	{ domainName: "UI/UX Design" },
	{ domainName: "Graphic Design" },
	{ domainName: "Marketing & Growth" },
	{ domainName: "Sales" },
	{ domainName: "HR & People Operations" },
	{ domainName: "Finance & Accounting" },
	{ domainName: "Business Strategy" },
	{ domainName: "Entrepreneurship & Startups" },
	{ domainName: "Legal" },
	{ domainName: "Content & Copywriting" },
	{ domainName: "Video & Film Production" },
];

async function main() {
	console.log("🌱 Seeding domains...");

	const result = await prisma.domain.createMany({
		data: domains,
		skipDuplicates: true,
	});

	console.log(`✅ Seeded ${result.count} domains`);
}

main()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
