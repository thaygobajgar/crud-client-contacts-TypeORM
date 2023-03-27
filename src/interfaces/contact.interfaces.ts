import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  contactReturnSchema,
  contactSchema,
  multipleContactsReturnSchema,
  returnContactsByClientSchema,
} from "../schemas";
type IContact = z.infer<typeof contactSchema>;
type IContactReturn = z.infer<typeof contactReturnSchema>;
type IContactsReturn = z.infer<typeof multipleContactsReturnSchema>;
type IContactUpdate = DeepPartial<IContact>;
type IContactsByUser = z.infer<typeof returnContactsByClientSchema>;

export {
  IContact,
  IContactReturn,
  IContactUpdate,
  IContactsReturn,
  IContactsByUser,
};
