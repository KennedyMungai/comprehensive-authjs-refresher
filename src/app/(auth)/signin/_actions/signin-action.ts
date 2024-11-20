"use server";

import { actionClient } from "@/lib/safe-action";
import { SigninSchema } from "@/lib/validation";

export const loginAction = actionClient
  .schema(SigninSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log({ email, password });
  });
