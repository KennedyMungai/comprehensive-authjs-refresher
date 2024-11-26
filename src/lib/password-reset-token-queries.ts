import "server-only";

import { db } from "@/db";
import { passwordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getPasswordResetTokenByToken = async (token: string) =>
  await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.token, token))
    .then((res) => res[0]);

export const getPasswordResetTokenByEmail = async (email: string) =>
  await db
    .select()
    .from(passwordResetToken)
    .where(eq(passwordResetToken.email, email))
    .then((res) => res[0]);
