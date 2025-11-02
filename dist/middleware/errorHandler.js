import logger from "../libs/logger";
export function errorHandler(err, _req, res, _next) {
    logger.error(err.message || "Server error");
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
}
//# sourceMappingURL=errorHandler.js.map