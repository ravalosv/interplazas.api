import { Request, Response, NextFunction } from "express";

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.info(`\x1b[33m%s\x1b[0m`, `*** ${req.method} Request URL : ${req.originalUrl}`);
  next();
};

export { logMiddleware };
