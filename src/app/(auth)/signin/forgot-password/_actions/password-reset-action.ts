"use server";

import { generatePasswordResetToken } from "@/lib/password-reset-token";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import { ForgotPasswordSchema } from "@/lib/validation";

export const passwordResetAction = actionClient
  .schema(ForgotPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const existingUser = await findUserByEmail(email);

    if (!existingUser) throw new Error("User does not exist");

    await generatePasswordResetToken(email);
  });
