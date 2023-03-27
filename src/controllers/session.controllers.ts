import { NextFunction, Request, Response } from "express";
import { ISession } from "../interfaces";
import { createSessionService } from "../services/session";

const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const sessionData: ISession = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json({ token: token });
};

export { createSessionController };
