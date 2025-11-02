"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../libs/logger");
function errorHandler(err, _req, res, _next) {
    logger_1.default.error(err.message || "Server error");
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
}
//# sourceMappingURL=errorHandler.js.map