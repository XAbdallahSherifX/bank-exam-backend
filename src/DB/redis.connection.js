import { createClient } from "redis";
import { REDIS_URI } from "../../config/config.service.js";

export const redisClient = createClient({
  url: REDIS_URI,
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Redis database is connected successfully 🔴⚪");
  } catch (error) {
    console.log("Failed to connect to redis database", error);
  }
}
