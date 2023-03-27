import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../errors/AppError";

const ensureContactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOneBy({ id: req.params.id });

  if (!findContact) {
    throw new AppError("Contact not found", 404);
  }

  return next();
};

export default ensureContactExistsMiddleware;
