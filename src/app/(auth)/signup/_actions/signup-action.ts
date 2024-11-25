"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { sendSignupUserEmail } from "@/lib/send-signup-user-email";
import { generateVerificationToken } from "@/lib/tokens";
import { findUserByEmail } from "@/lib/user-queries";
import { SignupSchema } from "@/lib/validation";
import bcrypt from "bcryptjs";

export const registerAction = actionClient
  .schema(SignupSchema)
  .action(
    async ({ parsedInput: { email, password, name, confirmPassword } }) => {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await findUserByEmail(email);

      if (existingUser) throw new Error("User already exists");

      const [newUser] = await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returning();

      if (!newUser) throw new Error("Something went wrong");

      const verificationToken = await generateVerificationToken(newUser.email!);

      await sendSignupUserEmail({
        email: newUser.email!,
        token: verificationToken.token,
      });

      return { data: newUser };
    },
  );
