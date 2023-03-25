import { IClient, IClientReturn } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { Repository } from "typeorm";
import { clientReturnSchema } from "../../schemas";

const createClientService = async (
  clientData: IClient
): Promise<IClientReturn> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const client = clientRepository.create(clientData);

  await clientRepository.save(client);

  const newClient = clientReturnSchema.parse(client);

  return newClient;
};

export default createClientService;
