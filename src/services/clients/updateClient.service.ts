import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientReturn, IClientUpdate } from "../../interfaces";
import { clientReturnSchema } from "../../schemas";

const updateClientService = async (
  clientId: string,
  clientData: IClientUpdate
): Promise<IClientReturn> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClient = await clientRepository.findOneBy({ id: clientId });

  const client = clientRepository.create({
    ...findClient,
    ...clientData,
  });

  await clientRepository.save(client);

  const updatedClient = clientReturnSchema.parse(client);

  return updatedClient;
};

export default updateClientService;
