"use server";

import { signIn } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { SigninSchema } from "@/lib/validation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginAction = actionClient
  .schema(SigninSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  });
