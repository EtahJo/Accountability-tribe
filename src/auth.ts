import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById, getUserByUsername } from "./data/user";
import { getAccountByUserId } from "./data/account";
import { Streak, Session, Task, Notification } from "@prisma/client";

declare module "next-auth" {
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
			isOAuth: boolean;

			// isOAuth: boolean;
		} & DefaultSession["user"];
	}
}

export const { signIn, signOut, auth, handlers } = NextAuth({
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
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
				session.user.isOAuth = token.isOAuth as boolean;
			}
			return session;
		},
		async jwt({ token, user, account }) {
			if (!token.sub) return token;
			if (account?.accessToken) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
			}

			const existingUser = await getUserById(token.sub);
			if (!existingUser) return token;
			const existingAccount = await getAccountByUserId(existingUser.id);
			if (existingAccount && account?.provider !== "credential") {
				if (!existingUser?.username) {
					const idFragment= existingUser.id.substring(0,4)
					const username = `${existingUser.name}_${idFragment}`;
					await db.user.update({
						where: { id: existingUser.id },
						data: {
							username,
						},
					});
				}
			}

			token.isOAuth = !!existingAccount;
			token.username = existingUser.username;
			token.number = existingUser.number;
			token.linkedIn = existingUser.linkedIn;
			token.x = existingUser.X;
			token.facebook = existingUser.facebook;
			token.image = existingUser.image;
			token.country = existingUser.country;
			token.remember = existingUser.remember;
			token.timezone =
				existingUser.timezone ||
				Intl.DateTimeFormat().resolvedOptions().timeZone;
			token.sessions = existingUser.sessions;
			token.tasks = existingUser.tasks;
			token.streak = existingUser.streak;
			token.notifications = existingUser?.notifications;

			return token;
		},
	
	},
	

	adapter: PrismaAdapter(db),
	session: { strategy: "jwt" },
	...authConfig,
});
