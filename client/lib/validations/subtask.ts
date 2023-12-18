import * as z from 'zod'

export const subtaskFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
})

export type SubtaskFormValues = z.infer<typeof subtaskFormSchema>
