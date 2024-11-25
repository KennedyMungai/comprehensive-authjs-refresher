"use server";

import { db } from "@/db";
import { users, verificationTokens } from "@/db/schema";
import { findUserByEmail } from "@/lib/user-queries";
import { findVerificationTokenByToken } from "@/lib/verification-queries";
import { eq } from "drizzle-orm";

export const verifyEmailAction = async (
  token: (typeof verificationTokens.$inferSelect)["token"],
) => {
  const verificationToken = await findVerificationTokenByToken(token);

  if (verificationToken.expires < new Date())
    throw new Error("Token is expired");

  const existingUser = await findUserByEmail(verificationToken.identifier!);

  if (existingUser.id && !existingUser.emailVerified) {
    await db
      .update(users)
      .set({ emailVerified: new Date() })
      .where(eq(users.id, existingUser.id));

    await db
      .update(verificationTokens)
      .set({ expires: new Date() })
      .where(eq(verificationTokens.token, token));
  }

  return verificationToken;
};
