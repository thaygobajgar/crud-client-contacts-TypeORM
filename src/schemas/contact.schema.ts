import { z } from "zod";
import { Contact } from "../entities";
import { clientReturnSchema, clientSchema } from "./client.schema";
const contactSchema = z.object({
  firstName: z.string().max(50).min(3),
  lastName: z.string().max(50).min(3).optional().nullish(),
  email: z.string().email().max(127).min(9),
  phone: z.string().max(14).min(14),
});

const contactUpdateSchema = contactSchema.partial();

const contactReturnSchema = contactSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  client: clientReturnSchema,
});

const multipleContactsReturnSchema = contactReturnSchema.array();
const multipleContactsWithoutClientReturnSchema = contactReturnSchema
  .omit({
    client: true,
  })
  .array();

const returnContactsByClientSchema = clientReturnSchema.extend({
  contacts: multipleContactsWithoutClientReturnSchema,
});

export {
  contactSchema,
  contactReturnSchema,
  contactUpdateSchema,
  multipleContactsReturnSchema,
  returnContactsByClientSchema,
  multipleContactsWithoutClientReturnSchema,
};
