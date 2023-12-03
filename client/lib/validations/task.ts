import z from "zod"

export const TaskSchema = z.object({
  name: z.string().min(2),
  status: z.string().optional(),
  note: z.string().optional(),
  dueDate: z.union([z.string(), z.date()]).optional().nullable(),
  priority: z.string().optional().nullable(),
  listId: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  labelIds: z.array(z.string()).optional().nullable(),
})

export type TaskSchemaType = z.infer<typeof TaskSchema>;