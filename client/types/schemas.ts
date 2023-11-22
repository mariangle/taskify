import z from "zod"

const isPriorityValid = (value: string) => ['Low', 'High', 'Medium'].includes(value);
const isStatusValid = (value: string) => ['Incomplete', 'InProgress', 'Completed'].includes(value);
const isDateString = (value: string) => !isNaN(Date.parse(value));

export const taskSchema = z.object({
  name: z.string().min(3),
  dueDate: z.string(),
  status: z.string().refine(isStatusValid, { message: 'Please select a status' }),
  priority: z.string().refine(isPriorityValid, { message: 'Please select priority'}),
  listId: z.string().optional(),
  // recuring
})

export type TaskSchemaType = z.infer<typeof taskSchema>;

export const listSchema = z.object({
  value: z.string().min(2).max(10),
})

export type ListSchemaType = z.infer<typeof listSchema>