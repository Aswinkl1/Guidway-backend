import type { PrismaClient } from "../../src/generated/prisma/client";

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

export async function seedDomains(prisma: PrismaClient) {
	await prisma.domain.createMany({
		data: domains,
		skipDuplicates: true,
	});
}
