import "reflect-metadata";
import { connectRedis } from "@infrastructure/database/redisClient.js";
import app from "./presentation/server.js";
import { connectPrisma } from "@infrastructure/database/prisma.js";
import { EnvConfig } from "@config/env.js";
const start = async () => {
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
