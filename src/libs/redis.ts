import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redis.on("connect", () => console.log("🔌 Redis connected"));
redis.on("error", (err: any) => console.error("❌ Redis error:", err));

await redis.connect();
export default redis;
