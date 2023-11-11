import * as z from 'zod';

export const LoginSchema = z.object({
    username: z.string().min(4),
    password: z
      .string()
      .min(6)
      .max(20),
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  username: z.string().min(4),
  name: z.string().min(2),
  password: z
    .string()
    .min(6)
    .max(20),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;  