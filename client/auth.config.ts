import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import { getUserByEmail } from './lib/user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        const user = await getUserByEmail(email as string);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );

        if (passwordsMatch) return user;
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
