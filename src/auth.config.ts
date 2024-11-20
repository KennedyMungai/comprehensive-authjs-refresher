import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { SigninType } from "@/lib/validation";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials: SigninType) {},
    }),
  ],
} satisfies NextAuthConfig;
