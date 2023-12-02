import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(4),
    password: z
      .string()
      .min(6)
      .max(20),
  });

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().min(4),
  name: z.string().min(2),
  password: z.string().min(6).max(20),
  confirmPassword: z.string().min(6).max(20)
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;  