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
    });

    return new Response('Redirect', {
      headers: { Location: DEFAULT_LOGIN_REDIRECT },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return new NextResponse('Invalid Credentials', { status: 401 });
        default:
          return new NextResponse('An unknown error occured.', { status: 500 });
      }
    }
    throw error;
  }
};
