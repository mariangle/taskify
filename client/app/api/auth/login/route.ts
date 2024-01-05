import { NextResponse } from 'next/server';
import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const POST = async (req: Request) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new NextResponse('Missing Fields', { status: 400 });
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }
    throw error;
  }
};
