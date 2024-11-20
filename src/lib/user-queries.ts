import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

export const findUserByEmail = async (email: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .then((res) => res[0]);

export const findUserById = async (id: string) =>
  await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0]);