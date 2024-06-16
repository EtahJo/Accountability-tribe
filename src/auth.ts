import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserByEmail, getUserById } from './data/user';

export const { signIn, signOut, auth, handlers } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ token, session }) {
      console.log('session is', session);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (session.user) {
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      console.log('Token is ', token);
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.username = existingUser.username;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
