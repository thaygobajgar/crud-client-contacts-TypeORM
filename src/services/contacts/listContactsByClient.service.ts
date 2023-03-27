import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientsReturn, IContactsByUser } from "../../interfaces";
import {
  multipleClientsReturnSchema,
  returnContactsByClientSchema,
} from "../../schemas";

const listContactsByClientService = async (
  clientId: string
): Promise<IContactsByUser> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const client = await clientRepository.findOne({
    where: {
      id: clientId,
    },
    relations: {
      contacts: true,
    },
  });

  const contacts = returnContactsByClientSchema.parse(client);
  return contacts;
};

export default listContactsByClientService;
