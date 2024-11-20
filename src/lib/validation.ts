import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SigninType = z.infer<typeof SigninSchema>;

export const SignupSchema = SigninSchema.extend({
  name: z.string().min(1, "Name is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignupType = z.infer<typeof SignupSchema>;