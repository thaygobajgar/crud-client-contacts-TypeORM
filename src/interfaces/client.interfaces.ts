import {
  clientSchema,
  clientReturnSchema,
  multipleClientsReturnSchema,
  clientUpdateSchema,
} from "../schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type IClient = z.infer<typeof clientSchema>;

type IClientReturn = z.infer<typeof clientReturnSchema>;

type IClientsReturn = z.infer<typeof multipleClientsReturnSchema>;

type IClientUpdate = DeepPartial<IClient>;

export { IClient, IClientReturn, IClientsReturn, IClientUpdate };
