"use client";

import CardWrapper from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema, ForgotPasswordType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { passwordResetAction } from "../_actions/password-reset-action";
import { toast } from "sonner";

const ResetForm = () => {
  const { execute, isExecuting } = useAction(passwordResetAction, {
    onSuccess: () => toast.success("Password reset email sent"),
    onError: () => toast.error("Failed to send password reset email"),
  });

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordType) => {
    execute(data);

    form.reset();
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/signup"
      showSocial
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
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    disabled={form.formState.isSubmitting || isExecuting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                    disabled={form.formState.isSubmitting || isExecuting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {urlError && (
            <p className="rounded-sm bg-red-100 p-2 text-center text-sm text-red-500">
              {urlError}
            </p>
          )} */}
          <Button
            disabled={form.formState.isSubmitting || isExecuting}
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
        <Button asChild variant={"link"} className="mt-2">
          <Link href="/signin/password-reset">Forgot Password?</Link>
        </Button>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
