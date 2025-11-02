import { Request, Response, NextFunction } from "express";
import logger from "../libs/logger.js";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message || "Server error");
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
}
