import jwt from "jsonwebtoken";
import { Client } from "../../entities";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { ISession } from "../../interfaces";

const createSessionService = async (sessionData: ISession): Promise<string> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({
    email: sessionData.email,
  });

  if (!client) {
    throw new AppError("Client or password invalid", 403);
  }

  const passwordMatch = await compare(sessionData.password, client.password);
  if (!passwordMatch) {
    throw new AppError("Client or password invalid", 403);
  }

  const token: string = jwt.sign(
    {
      isAdm: client.isAdm,
      isActive: client.isActive,
    },
    process.env.SECRET_KEY as string,
    {
      subject: client.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default createSessionService;
