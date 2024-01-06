import * as z from 'zod';

export const labelFormSchema = z.object({
  name: z.string().min(2),
  color: z.string().min(2),
});

export type LabelFormValues = z.infer<typeof labelFormSchema>;
