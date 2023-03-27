import { AppDataSource } from "../../data-source";
import { Client } from "../../entities";

const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id: clientId });
  await clientRepository.softRemove(findClient!);
  await clientRepository.save({ ...findClient, isActive: false });
};

export default deleteClientService;
