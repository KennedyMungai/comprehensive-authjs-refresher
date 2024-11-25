import "server-only";

import { db } from "@/db";
import { verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

export const findVerificationTokenByToken = async (
  token: (typeof verificationTokens.$inferSelect)["token"],
) =>
  await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.token, token))
    .then((res) => res[0]);
