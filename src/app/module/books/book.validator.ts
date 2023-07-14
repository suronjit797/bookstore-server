import { z } from 'zod'

export const createBookValidatorZod = z.object({
  body: z.object({
    title: z.string(),
    genre: z.string(),
    publicationDate: z.string().datetime(),
  }),
})

export const updateBookValidatorZod = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().datetime().optional(),
  }),
})
