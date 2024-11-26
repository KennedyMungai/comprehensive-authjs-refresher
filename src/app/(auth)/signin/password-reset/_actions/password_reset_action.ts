"use server";

import { signIn } from "@/auth";
import { db } from "@/db";
import { passwordResetToken } from "@/db/schema";
import { getPasswordResetTokenByEmail } from "@/lib/password-reset-token-queries";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import { PasswordResetSchema } from "@/lib/validation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const passwordResetAction = actionClient
  .schema(PasswordResetSchema)
  .action(async ({ parsedInput: { email, password, confirmPassword } }) => {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password)
      throw new Error("Invalid credentials");

    if (!existingUser.emailVerified) throw new Error("Email is not verified");

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.email, email));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await signIn("credentials", {
      email,
      password: hashedPassword,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  });
