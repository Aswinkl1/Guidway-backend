import { connectRedis } from "@infrastructure/database/redisClient.js";
import app from "./presentation/server.js";
import { config } from "dotenv";
import { connectPrisma } from "@infrastructure/database/prisma.js";

const start = async () => {
  try {
    connectPrisma();
    connectRedis();
    app.listen(3000, () => console.log("server is running on port 3000"));
  } catch (error) {
    console.log("error while staring server", error);
  }
};

start();
