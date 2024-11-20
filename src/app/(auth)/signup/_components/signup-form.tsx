"use client";

import { registerAction } from "@/app/(auth)/signup/_actions/register-action";
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
import { SignupSchema, SignupType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignupForm = () => {
  const form = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { execute } = useAction(registerAction, {
    onSuccess: () => {
      toast.success("Confirmation email sent");
      form.reset();
    },
    onError: () => toast.error("Failed to register"),
  });
  const onSubmit = async (values: SignupType) => {
    execute(values);
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Already have an account?"
      backButtonHref="/signin"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter name"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={form.formState.isSubmitting}
                  />
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
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                    disabled={form.formState.isSubmitting}
                  />
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
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter password"
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default SignupForm;
