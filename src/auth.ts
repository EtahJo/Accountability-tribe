import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './data/user';

export const { signIn, signOut, auth, handlers } = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async session({ token, session }) {
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
        session.user.timezone = token.timezone;
        session.user.sessions = token.sessions;
        session.user.tasks = token.tasks;
        session.user.streak = token.streak;
        session.user.notifications = token.notifications;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

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
      token.timezone = existingUser.timezone;
      token.sessions = existingUser.sessions;
      token.tasks = existingUser.tasks;
      token.streak = existingUser.streak;
      token.notifications = existingUser.notifications;

      return token;
    },
  },

  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
