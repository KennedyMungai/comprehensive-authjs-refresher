import "server-only";
import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { getVerificationTokenByEmail } from "@/lib/verification-token";
import { eq } from "drizzle-orm";
import { v7 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken)
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.identifier, email));

  const [verificationToken] = await db
    .insert(verificationTokens)
    .values({ identifier: email, token, expires })
    .returning();

  return verificationToken;
};
