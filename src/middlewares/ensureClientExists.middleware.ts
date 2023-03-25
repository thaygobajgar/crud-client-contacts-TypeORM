import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities";
import { AppError } from "../errors/AppError";

const ensureClientExistsMiddleware = async (
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

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  return next();
};

export default ensureClientExistsMiddleware;
