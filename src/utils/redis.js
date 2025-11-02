import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1", // use Docker service or localhost
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("🧠 Redis client connected successfully");
});

// Connect when imported
await redisClient.connect();

export default redisClient;
