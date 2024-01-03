'use client';

import * as z from 'zod';
import React from 'react';
import toast from 'react-hot-toast';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleError } from '@/lib/util/error';

import AuthService from '@/services/auth-service';

const loginFormSchema = z.object({
  email: z.string().min(4),
  password: z.string().min(6).max(20),
});

const registerFormSchema = z
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

type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface Props {
  variant: 'register' | 'login';
}

type AuthSchemaType = {
  login: LoginFormValues;
  register: RegisterFormValues;
}[Props['variant']];

function AuthForm({ variant }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const authService = new AuthService();
  const authSchema = variant === 'login' ? loginFormSchema : registerFormSchema;
  const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema) });

  const onSubmit: SubmitHandler<AuthSchemaType> = async (
    data: AuthSchemaType,
  ) => {
    try {
      setIsLoading(true);
      if (variant === 'login') {
        const loginData = data as LoginFormValues;
        await authService.login(loginData.email, loginData.password);
        toast.success('Successfully logged in! Redirecting to dashboard...');
        router.push('/inbox');
      } else if (variant === 'register') {
        const registerData = data as RegisterFormValues;
        await authService.register(
          registerData.email,
          registerData.name,
          registerData.password,
        );
        toast.success('Successfully registered. You can now log in.');
        router.push('/login');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 max-w-sm w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {variant === 'register' && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {variant === 'register' && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          variant="default"
          disabled
          onClick={form.handleSubmit(onSubmit)}
        >
          {variant === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
    </Form>
  );
}
export default AuthForm;
