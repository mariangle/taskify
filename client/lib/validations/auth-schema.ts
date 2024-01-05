import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().min(4),
  password: z.string().min(6).max(20),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    email: z.string().min(4),
    name: z.string().min(2),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match',
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
