import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import "server-only";

export const getVerificationTokenByEmail = async (email: string) =>
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.identifier, email))
    .then((res) => res[0]);
