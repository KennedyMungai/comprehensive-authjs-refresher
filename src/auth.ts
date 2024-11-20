import authConfig from "@/auth.config";
import { db } from "@/db";
import { findUserById } from "@/lib/user-queries";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await findUserById(user.id!);

    //   if (!existingUser || !existingUser.emailVerified) return false;

    //   return true;
    // },
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
  pages: { signIn: "/signin" },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
