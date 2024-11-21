"use server";

import { signIn } from "@/auth";
import { actionClient } from "@/lib/safe-action";
import { SocialsSchema } from "@/lib/validation";

export const socialLogin = actionClient
  .schema(SocialsSchema)
  .action(async ({ parsedInput: { provider } }) => {
    await signIn(provider);
  });
