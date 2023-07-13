import { z } from 'zod'

export const userRegisterValidatorZod = z.object({
  body: z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })
    .strict(),
})
export const userLoginValidatorZod = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
})
