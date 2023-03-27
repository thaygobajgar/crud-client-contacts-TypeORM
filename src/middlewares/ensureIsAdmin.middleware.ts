import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { ZodTypeAny } from "zod";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";

const ensureDataIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
};
