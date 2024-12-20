"use server";

import { signIn } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { findUserByEmail } from "@/lib/user-queries";
import { SigninSchema } from "@/lib/validation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = actionClient
  .schema(SigninSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const existingUser = await findUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password)
      throw new Error("Invalid credentials");

    if (!existingUser.emailVerified) throw new Error("Email is not verified");

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  });
