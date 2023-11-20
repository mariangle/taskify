import * as z from 'zod';

const isStatusValid = (value: string) => ['Incomplete', 'InProgress', 'Completed'].includes(value);
const isDateString = (value: string) => !isNaN(Date.parse(value));

export const taskSchema = z.object({
  name: z.string().min(3),
  location: z.string().optional(),
  dueDate: z.string().refine(isDateString, { message: 'Due date must be a valid date string' }),
  // TODO: Add priority
  status: z.string().refine(isStatusValid, { message: 'Please select!!' }),
  // reccuring
});

export type TaskSchemaType = z.infer<typeof taskSchema>;

export const listSchema = z.object({
  value: z.string().min(2).max(10),
})

export type ListSchemaType = z.infer<typeof listSchema>