import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";
import authConfig from "@/auth.config";

type NextAuthRequest = NextRequest & { auth: Session | null };

export const { auth } = NextAuth(authConfig);

export default auth((request: NextAuthRequest) => {
  const { auth, nextUrl } = request;

  const isLoggedIn = !!auth;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
