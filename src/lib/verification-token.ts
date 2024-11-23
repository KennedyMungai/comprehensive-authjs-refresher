import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

export const getVerificationToken = async (token: string) =>
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .then((res) => res[0]);
