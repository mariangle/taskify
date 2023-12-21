import * as z from 'zod'

export const listFormSchema = z.object({
  name: z.string().min(2).max(10),
})

export type ListFormValues = z.infer<typeof listFormSchema>
