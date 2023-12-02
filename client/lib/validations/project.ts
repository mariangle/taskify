import * as z from 'zod';

export const ProjectSchema = z.object({
    name: z.string().min(2).max(10),
  })
  
export type ProjectSchemaType = z.infer<typeof ProjectSchema>