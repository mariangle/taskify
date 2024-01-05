import * as React from 'react';

import Link from 'next/link';

import { Metadata } from 'next';
import { cn } from '@/lib/util/tw-merge';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import AuthForm from '../auth-form';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div
      style={{
        background:
          'linear-gradient(to bottom, hsl(var(--background)) 10%, transparent 80%)',
      }}
    >
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-4 top-4 md:left-8 md:top-8',
          )}
        >
          <>
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.Logo className="mx-auto h-6 w-6" />
            <h1 className="text-xl font-semibold tracking-tight">
              Login to Taskify
            </h1>
            <p className="text-sm text-muted-foreground">
              Ready to tackle your tasks? Just sign in below.
            </p>
          </div>
          <AuthForm variant="login" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link
              href="/auth/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>{' '}
      </div>
    </div>
  );
}
