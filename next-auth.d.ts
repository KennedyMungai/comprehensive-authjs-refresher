import { users } from "@/db/schema";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: (typeof users.$inferSelect)["role"];
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}