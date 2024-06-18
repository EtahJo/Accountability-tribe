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
        session.user.number = token.number;
        session.user.linkedIn = token.linkedIn;
        session.user.facebook = token.facebook;
        session.user.x = token.x;
        session.user.image = token.image;
        session.user.country = token.country;
        session.user.remember = token.remember;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      console.log('Token is ', token);
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.username = existingUser.username;
      token.number = existingUser.number;
      token.linkedIn = existingUser.linkedIn;
      token.x = existingUser.X;
      token.facebook = existingUser.facebook;
      token.image = existingUser.image;
      token.country = existingUser.country;
      token.remember = existingUser.remember;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
