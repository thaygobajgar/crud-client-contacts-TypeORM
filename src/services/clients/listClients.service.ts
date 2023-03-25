import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";
import { IClientsReturn } from "../../interfaces";
import { multipleClientsReturnSchema } from "../../schemas";

const listClientsService = async (): Promise<IClientsReturn> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const findClients: Array<Client> = await clientRepository.find({
    withDeleted: true,
    // take: 2,
    // skip: 2 * (2 - 1),
    order: {
      firstName: "ASC",
    },
  });

  const clients = multipleClientsReturnSchema.parse(findClients);

  return clients;
};

export default listClientsService;
