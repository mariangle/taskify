import * as z from 'zod';

export const LabelSchema = z.object({
    name: z.string().min(2),
    color: z.string().min(2),
  })
  
export type LabelSchemaType = z.infer<typeof LabelSchema>;
  