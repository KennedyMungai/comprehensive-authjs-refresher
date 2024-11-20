"use server";

import { actionClient } from "@/lib/safe-action";
import { SignupSchema } from "@/lib/validation";

export const registerAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { email, password, name, confirmPassword } }) => {},
  );
