import { createClient } from 'redis';

export const redisClient = createClient();

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to Redis successfully!'));

export const connectRedis = async (): Promise<void> => {
  await redisClient.connect();
};

export type AppRedisClientType = typeof redisClient;
