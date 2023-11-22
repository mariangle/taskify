import z from "zod"

const isStatusValid = (value: string) => ['Incomplete', 'InProgress', 'Completed'].includes(value);

export const taskSchema = z.object({
  name: z.string().min(3),
  dueDate: z.string().optional().nullable(),
  status: z.string().refine(isStatusValid, { message: 'Please select a status' }),
  priority: z.string().nullable().optional(),
  listId: z.string().optional().nullable(),
  // recuring
})

export type TaskSchemaType = z.infer<typeof taskSchema>;

export const listSchema = z.object({
  value: z.string().min(2).max(10),
})

export type ListSchemaType = z.infer<typeof listSchema>