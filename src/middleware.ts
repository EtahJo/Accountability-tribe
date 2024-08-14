import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import { NextRequest } from "next/server";
import {
	authRoutes,
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	publicRoutes,
	userProfilePrefix,
	tribeProfilePrefix,
	tribesPrefix,
	sessionsPrefix
} from "./routes";

export const { auth } = NextAuth(authConfig);
export default auth(
	(req: NextRequest & { auth: Session | null }): Response | void => {
		const { nextUrl } = req;
		const isLoggedIn = !!req.auth;
		const isAuthRoute = authRoutes.includes(nextUrl.pathname);
		const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
		const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
		const isUserProfileRoute = nextUrl.pathname.startsWith(userProfilePrefix);
		const isTribeProfileRoute = nextUrl.pathname.startsWith(tribeProfilePrefix);
		const tribesRoute = nextUrl.pathname.startsWith(tribesPrefix);
		const sessionsRoute= nextUrl.pathname.startsWith(sessionsPrefix);

		if (isApiRoute) return;
		if (isAuthRoute) {
			if (isLoggedIn) {
				return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
			}
			return;
		}
		{
			/**checks if user is not logged
   in and not in a public route. if so rredirect user to the 
  the log in page */
		}
		if (
			!isLoggedIn &&
			!isPublicRoute &&
			!isUserProfileRoute &&
			!isTribeProfileRoute&&
			!tribesRoute&&
			!sessionsRoute
		) {
			let callbackUrl = nextUrl.pathname;
			if (nextUrl.search) {
				callbackUrl += nextUrl.search;
			}
			const encodedCallbackUrl = encodeURIComponent(callbackUrl);
			return Response.redirect(
				new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
			);
		}
		return;
	},
);
// invokes middleware on all routes
export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
