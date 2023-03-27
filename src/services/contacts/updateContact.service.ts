import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactReturn, IContactUpdate } from "../../interfaces";
import { contactReturnSchema } from "../../schemas";

const updateContactService = async (
  contactId: string,
  contactData: IContactUpdate
): Promise<IContactReturn> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({
    where: { id: contactId },
    relations: { client: true },
  });

  const contact = contactRepository.create({
    ...findContact,
    ...contactData,
  });

  await contactRepository.save(contact);
  console.log(contact);

  const updatedContact = contactReturnSchema.parse(contact);

  return updatedContact;
};

export default updateContactService;
