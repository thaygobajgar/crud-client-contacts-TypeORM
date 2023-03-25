import { z } from "zod";

const createSessionSchema = z.object({
  email: z.string().email().max(127).min(9),
  password: z.string().max(20).min(6),
});
export { createSessionSchema };
