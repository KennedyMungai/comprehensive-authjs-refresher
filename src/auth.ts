import authConfig from "@/auth.config";
import { db } from "@/db";
import { users } from "@/db/schema";
import { findUserById } from "@/lib/user-queries";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await findUserById(user.id!);

      if (!existingUser?.emailVerified) return false;

      // TODO: Add 2FA check

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await findUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (session.user && token.sub) session.user.id = token.sub;

      if (token.role && session.user) {
        session.user.role = token.role as "USER" | "ADMIN";
      }

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id!));
    },
  },
  pages: { signIn: "/signin", error: "/error" },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
