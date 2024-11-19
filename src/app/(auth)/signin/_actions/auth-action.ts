"use server";

import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/lib/validation";

export const loginAction = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log({ email, password });
  });
