import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors/AppError";

const ensureClientDoNotExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (findClient) {
    throw new AppError("Client already registered", 409);
  }

  return next();
};

export default ensureClientDoNotExistsMiddleware;
