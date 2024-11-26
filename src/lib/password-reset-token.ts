import "server-only";

import { getPasswordResetTokenByEmail } from "@/lib/password-reset-token-queries";
import { v7 as uuid } from "uuid";
import { db } from "@/db";
import { passwordResetToken } from "@/db/schema";
import { eq } from "drizzle-orm";
import { sendResetUserEmail } from "@/lib/send-reset-user-email";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.email, email));
  }

  const [resetToken] = await db
    .insert(passwordResetToken)
    .values({ email, token, expires })
    .returning();

  await sendResetUserEmail({ email, token });

  return resetToken;
};
