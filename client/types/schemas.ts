import * as z from 'zod';

const isStatusValid = (value: string) => ['Incomplete', 'InProgress', 'Completed'].includes(value);
const isDateString = (value: string) => !isNaN(Date.parse(value));

export const taskSchema = z.object({
  name: z.string().min(3),
  // tags
  location: z.string().optional(),
  dueDate: z.string().refine(isDateString, { message: 'Due date must be a valid date string' }),
  // category
  // priority
  status: z.string().refine(isStatusValid, { message: 'Please select!!' }),
  // reccuring
});

export type TaskSchemaType = z.infer<typeof taskSchema>;