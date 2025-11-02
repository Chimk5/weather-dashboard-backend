import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { createClient } from "redis";
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.connect().catch(console.error);
const rateLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000, // 1 min
    max: Number(process.env.RATE_LIMIT_MAX) || 60, // 60 req per minute
    standardHeaders: true,
    legacyHeaders: false,
});
export default rateLimiter;
//# sourceMappingURL=rateLimiter.js.map