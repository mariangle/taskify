import z from "zod"

export const TaskSchema = z.object({
  name: z.string().min(2),
  status: z.string().min(2),
  dueDate: z.union([z.string(), z.date()]).optional(),
  priority: z.string().optional(),
  listId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
})

export type TaskSchemaType = z.infer<typeof TaskSchema>;