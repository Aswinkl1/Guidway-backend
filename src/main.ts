import "reflect-metadata";
import { EnvConfig } from "@config/env.js";
import { connectPrisma } from "@infrastructure/database/prisma.js";
import { connectRedis } from "@infrastructure/database/redisClient.js";
import app from "./presentation/server.js";

const start = async (): Promise<void> => {
	try {
		connectPrisma();
		connectRedis();
		app.listen(EnvConfig.PORT, () =>
			console.log(`server is running on port ${EnvConfig.PORT}`),
		);
	} catch (error) {
		console.log("error while staring server", error);
	}
};

start();
