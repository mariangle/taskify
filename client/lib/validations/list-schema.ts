import * as z from 'zod';

export const listFormSchema = z.object({
  name: z.string().min(2).max(15),
});

export type ListFormValues = z.infer<typeof listFormSchema>;
