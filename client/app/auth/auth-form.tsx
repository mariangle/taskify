'use client';

import React from 'react';
import toast from 'react-hot-toast';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { AuthService } from '@/services/auth-service';
import {
  LoginFormValues,
  loginFormSchema,
  RegisterFormValues,
  registerFormSchema,
} from '@/lib/validations/auth-schema';

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
import SocialsActions from './socials-actions';

interface AuthFormProps {
  variant: 'register' | 'login';
}

type AuthSchemaType = {
  login: LoginFormValues;
  register: RegisterFormValues;
}[AuthFormProps['variant']];

function AuthForm({ variant }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const authSchema = variant === 'login' ? loginFormSchema : registerFormSchema;
  const form = useForm<AuthSchemaType>({ resolver: zodResolver(authSchema) });

  const onSubmit: SubmitHandler<AuthSchemaType> = async (
    data: AuthSchemaType,
  ) => {
    try {
      // throw new Error('Disabled during construction.');
      // eslint-disable-next-line no-unreachable
      setIsLoading(true);

      if (variant === 'login') {
        const { email, password } = data as LoginFormValues;
        await AuthService.login(email, password);
        toast.success('Successfully logged in! Redirecting to dashboard...');
      } else if (variant === 'register') {
        const { email, name, password } = data as RegisterFormValues;
        await AuthService.register(email, name, password);
        toast.success('Successfully registered. You can now log in.');
        router.push('/auth/login');
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data);
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 max-w-sm w-full mx-auto">
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
          onClick={form.handleSubmit(onSubmit)}
        >
          {variant === 'login' ? 'Login' : 'Register'}
        </Button>
      </form>
      {variant === 'login' && <SocialsActions />}
    </Form>
  );
}
export default AuthForm;
