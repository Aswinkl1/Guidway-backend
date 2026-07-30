import "reflect-metadata";
import { createServer } from "node:http";
import { EnvConfig } from "@config/env.js";
import { connectPrisma } from "@infrastructure/database/prisma.js";
import { connectRedis } from "@infrastructure/database/redisClient.js";
import { initSocket } from "@presentation/webSockets/ws.js";
import app from "./presentation/server.js";

const start = async (): Promise<void> => {
	try {
		connectPrisma();
		connectRedis();
		const server = createServer(app);
		initSocket(server);
		server.listen(EnvConfig.PORT, () =>
			console.log(`server is running on port ${EnvConfig.PORT}`),
		);
	} catch (error) {
		console.log("error while staring server", error);
	}
};

start();
