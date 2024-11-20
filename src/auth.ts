import authConfig from "@/auth.config";
import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      console.log({ token });

      return token;
    },
  },
  pages: { signIn: "/signin" },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
