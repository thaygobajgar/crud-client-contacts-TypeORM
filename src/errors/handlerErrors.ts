import { Request, Response, NextFunction } from "express";
import { AppError } from "./AppError";
import { ZodError } from "zod";

const handleErrors = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: `${err.message}`,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json(err.flatten().fieldErrors);
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal server error",
  });
};

export default handleErrors;
