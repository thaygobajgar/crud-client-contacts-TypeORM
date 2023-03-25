import { z } from "zod";
import { Client } from "../entities";
import { hashSync } from "bcryptjs";
const clientSchema = z.object({
  firstName: z.string().max(50).min(3),
  lastName: z.string().max(50).min(3),
  email: z.string().email().max(127).min(9),
  password: z
    .string()
    .max(20)
    .min(6)
    .transform((pass) => {
      return hashSync(pass, 10);
    }),
  phone: z.string().max(14).min(14),
});

const clientUpdateSchema = clientSchema.partial();

const clientReturnSchema = clientSchema
  .extend({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
    isAdm: z.boolean(),
    isActive: z.boolean(),
  })
  .omit({ password: true });

const multipleClientsReturnSchema = clientReturnSchema.array();

export {
  clientSchema,
  clientReturnSchema,
  multipleClientsReturnSchema,
  clientUpdateSchema,
};
