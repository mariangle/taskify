import * as z from 'zod';

const isStatusValid = (value: string) => ['Todo', 'InProgress', 'Completed'].includes(value);
const isDateString = (value: string) => !isNaN(Date.parse(value));

export const taskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  // tags
  location: z.string().optional(),
  dueDate: z.string().refine(isDateString, { message: 'Due date must be a valid date string' }),
  // category
  // priority
  status: z.string().refine(isStatusValid, { message: 'Please select!!' }),
  // reccuring
});

export type TaskSchemaType = z.infer<typeof taskSchema>;