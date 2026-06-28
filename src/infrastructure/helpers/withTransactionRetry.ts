import { Prisma } from "generated/prisma/client";

const _delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export async function withTransactionRetry<T>(
	operation: () => Promise<T>,
	maxReries: number = 3,
	baseDelayMs: number = 50,
) {
	let attempts = 0;
	while (attempts < maxReries) {
		try {
			return await operation();
		} catch (error) {
			attempts++;

			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === "P2034"
			) {
				if (attempts >= maxReries) {
					throw new Error("system is busy ");
				}
				const waitTime =
					baseDelayMs * (2 ** attempts - 1) + Math.floor(Math.random() * 30);
				await _delay(waitTime);
				continue;
			}

			throw error;
		}
	}
	throw new Error("Unexpected end of retry loop.");
}
