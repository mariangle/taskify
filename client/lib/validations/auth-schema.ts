import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password should be at least 6 characters long')
    .max(20, 'Password is too long (maximum 20 characters)'),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    email: z.string().email('Invalid email'),
    name: z
      .string()
      .min(2, 'Name should be at least 2 characters long')
      .max(15, 'Name is too long (maximum 15 characters)'),
    password: z
      .string()
      .min(6, 'Password should be at least 6 characters long')
      .max(20, 'Password is too long (maximum 20 characters)'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password should be at least 6 characters long')
      .max(20, 'Confirm Password is too long (maximum 20 characters)'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
