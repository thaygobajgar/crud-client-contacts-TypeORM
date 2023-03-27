import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities";
import { AppError } from "../errors/AppError";
const ensureIsContactOwnerOrAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactId = req.params.id;
  const owner = await AppDataSource.getRepository(Contact)
    .createQueryBuilder()
    .select("client.id", "id")
    .from(Contact, "contact")
    .innerJoin("contact.client", "client")
    .where("contact.id = :contactId", { contactId })
    .getRawOne();

  if (!req.client.isAdm && req.client.id !== owner.id) {
    throw new AppError("Your're not the Owner", 401);
  }

  return next();
};

export default ensureIsContactOwnerOrAdminMiddleware;
