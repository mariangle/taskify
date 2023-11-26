import * as z from 'zod';

export const ListSchema = z.object({
    value: z.string().min(2).max(10),
  })
  
export type ListSchemaType = z.infer<typeof ListSchema>