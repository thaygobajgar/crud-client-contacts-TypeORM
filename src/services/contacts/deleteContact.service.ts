import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities";
import { IContactReturn, IContactUpdate } from "../../interfaces";
import { contactReturnSchema } from "../../schemas";

const deleteContactService = async (contactId: string): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({
    where: { id: contactId },
    relations: { client: true },
  });

  await contactRepository.remove(findContact!);
};

export default deleteContactService;
