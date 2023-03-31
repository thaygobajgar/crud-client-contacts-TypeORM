import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientReturn } from "../../interfaces";
import { returnContactsByClientSchema } from "../../schemas";

const listClientByIdService = async (
  clientId: string
): Promise<IClientReturn> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOne({
    where: {
      id: clientId,
    },
    relations: {
      contacts: true,
    },
  });

  const client = returnContactsByClientSchema.parse(findClient);
  return client;
};

export default listClientByIdService;
