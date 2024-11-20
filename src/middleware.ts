import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";
import NextAuth, { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type NextAuthRequest = NextRequest & { auth: Session | null };

export const { auth } = NextAuth(authConfig);

export default auth((request: NextAuthRequest) => {
  const { auth, nextUrl } = request;

  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
