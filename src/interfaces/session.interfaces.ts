import { z } from "zod";
import { createSessionSchema } from "../schemas";

type ISession = z.infer<typeof createSessionSchema>;

export { ISession };
