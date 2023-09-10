import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
          type: "credentials",
          credentials: {},
          authorize(credentials, req) {
            const { email, password } = credentials as {
              email: string;
              password: string;
            };
            // perform you login logic
            // find out user from db
            if (email !== "john@gmail.com" || password !== "1234") {
              throw new Error("Invalid Credentials");
            }
    
            // if everything is fine
            return {
              id: "1234",
              name: "John Doe",
              email: "john@gmail.com",
              role: "admin",
            };
          },
        }),
      ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };