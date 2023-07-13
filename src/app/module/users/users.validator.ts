import { z } from "zod";

const userValidatorZod = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  }),
});

export default userValidatorZod;
