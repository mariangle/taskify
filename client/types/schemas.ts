import z from "zod"

const isStatusValid = (value: string) => ['Incomplete', 'InProgress', 'Completed'].includes(value);

export const taskSchema = z.object({
  name: z.string().min(2),
  status: z.string().min(2),
  dueDate: z.union([z.string(), z.date()]).optional(),
  priority: z.string().optional(),
  listId: z.string().optional(),
  // recuring
})

export type TaskSchemaType = z.infer<typeof taskSchema>;

export const listSchema = z.object({
  value: z.string().min(2).max(10),
})

export type ListSchemaType = z.infer<typeof listSchema>