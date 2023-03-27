import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Client, Contact } from "../../entities";
import { IContact, IContactReturn } from "../../interfaces";
import { contactReturnSchema } from "../../schemas";

const createContactService = async (
  clientId: string,
  contactData: IContact
): Promise<IContact> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const client: Client | null = await clientRepository.findOneBy({
    id: clientId,
  });

  const contact: Contact = contactRepository.create({
    ...contactData,
    client: client!,
  });
  await contactRepository.save(contact);

  const newContact = contactReturnSchema.parse(contact);
  return newContact;
};

export default createContactService;
