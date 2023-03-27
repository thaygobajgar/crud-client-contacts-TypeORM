import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactsReturn } from "../../interfaces";
import { multipleContactsReturnSchema } from "../../schemas";

const listContactsService = async (): Promise<IContactsReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const findContacs: Array<Contact> = await contactRepository.find({
    relations: { client: true },
  });

  const contacts = multipleContactsReturnSchema.parse(findContacs);
  return contacts;
};
export default listContactsService;
