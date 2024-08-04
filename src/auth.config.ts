import { LoginSchema } from "@/schemas/index";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { google } from "googleapis";

const scopes = [
	"https://www.googleapis.com/auth/calendar.events",
	"https://www.googleapis.com/auth/calendar",
].join(" ");

export default {
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			// authorization: `https://accounts.google.com/o/oauth2/auth?prompt=consent&access_type=offline&response_type=code&scope=${scopes}`,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials);
				if (validatedFields.success) {
					const { email, password } = validatedFields.data;
					const user = await getUserByEmail(email);
					if (!user || !user.password) return null;
					const passwordMatch = await bcrypt.compare(password, user.password);
					if (passwordMatch) return user;
				}
				return null;
			},
		}),
	],
	
} satisfies NextAuthConfig;
