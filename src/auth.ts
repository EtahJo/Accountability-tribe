import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './data/user';
import { Streak, Session, Task, Notification } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      // role: 'ADMIN' | 'USER';
      username: string;
      number: string;
      linkedIn: string;
      facebook: string;
      x: string;
      image: string;
      country: string;
      remember: boolean;
      timezone: string;
      sessions: Session[];
      tasks: Task[];
      streak: Streak;
      notifications: Notification[];

      // isOAuth: boolean;
    } & DefaultSession['user'];
  }
}

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
        session.user.username = token.username as string;
        session.user.number = token.number as string;
        session.user.linkedIn = token.linkedIn as string;
        session.user.facebook = token.facebook as string;
        session.user.x = token.x as string;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.remember = token.remember as boolean;
        session.user.timezone = token.timezone as string;
        session.user.sessions = token.sessions as [];
        session.user.tasks = token.tasks as [];
        session.user.streak = token.streak as Streak;
        session.user.notifications = token.notifications as [];
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
