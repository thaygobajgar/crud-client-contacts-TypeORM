import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../errors/AppError";
const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.client.isAdm) {
    throw new AppError("Missing admin permissions", 401);
  }

  return next();
};

export default ensureIsAdminMiddleware;
