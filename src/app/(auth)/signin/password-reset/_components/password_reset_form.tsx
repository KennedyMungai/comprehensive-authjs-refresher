"use client";

import { passwordResetAction } from "@/app/(auth)/signin/password-reset/_actions/password_reset_action";
import CardWrapper from "@/components/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordResetSchema, PasswordResetType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PasswordResetForm = () => {
  const { execute } = useAction(passwordResetAction, {
    onSuccess: () => toast.success("Login successful"),
    onError: () => toast.error("Failed to login"),
  });

  const form = useForm<PasswordResetType>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: PasswordResetType) => {
    execute(values);

    form.reset();
  };

  return (
    <CardWrapper
      headerLabel="Reset Password"
      backButtonLabel="Back to Sign In"
      backButtonHref="/signin"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default PasswordResetForm;
