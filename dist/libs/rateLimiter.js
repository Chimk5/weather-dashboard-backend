"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const rate_limit_redis_1 = require("rate-limit-redis");
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.connect().catch(console.error);
const rateLimiter = (0, express_rate_limit_1.default)({
    store: new rate_limit_redis_1.default({
        sendCommand: (...args) => redisClient.sendCommand(args),
    }),
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60 * 1000, // 1 min
    max: Number(process.env.RATE_LIMIT_MAX) || 60, // 60 req per minute
    standardHeaders: true,
    legacyHeaders: false,
});
exports.default = rateLimiter;
//# sourceMappingURL=rateLimiter.js.map