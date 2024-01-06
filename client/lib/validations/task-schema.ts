import * as z from 'zod';

export const taskFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.union([z.date(), z.string()]).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  listId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
