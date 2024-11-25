import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { findVerificationTokenByToken } from "@/lib/verification-queries";
import { CheckCircle2Icon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { verifyEmailAction } from "@/app/(auth)/signup/verify-email/_actions/verify-email-action";

type Props = {
  searchParams: {
    token?: string;
  };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  if (!token)
    return (
      <Card className="min-h-56 w-96">
        <CardHeader>
          <CardTitle>No token found</CardTitle>
          <CardDescription>
            No signup token was found on the URL
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
          <TriangleAlertIcon className="size-5 animate-pulse text-red-500" />
          <Link href="/signup">
            <p className="text-sm hover:underline">
              Go back to the sign up page and try again
            </p>
          </Link>
        </CardContent>
      </Card>
    );

  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken || verificationToken.expires < new Date())
    return (
      <Card className="min-h-56 w-96">
        <CardHeader>
          <CardTitle>Invalid Token</CardTitle>
          <CardDescription>
            The provided is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
          <TriangleAlertIcon className="size-5 animate-pulse text-red-500" />
          <Link href="/signup">
            <p className="text-sm hover:underline">
              Go back to the sign up page and try again
            </p>
          </Link>
        </CardContent>
      </Card>
    );

  const res = await verifyEmailAction(token);

  if (!res) {
    return (
      <Card className="min-h-56 w-96">
        <CardHeader>
          <CardTitle>Invalid Token</CardTitle>
          <CardDescription>
            The provided is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
          <TriangleAlertIcon className="size-5 animate-pulse text-red-500" />
          <Link href="/signup">
            <p className="text-sm hover:underline">
              Go back to the sign up page and try again
            </p>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-56 w-96">
      <CardHeader>
        <CardTitle>Email Verified</CardTitle>
        <CardDescription>The email address had been verified</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        <CheckCircle2Icon className="size-5 animate-pulse text-emerald-500" />
        <Link href="/signin">
          <p className="text-sm hover:underline">
            Proceed to the signin page and sign in to the application using your
            newly created credentials
          </p>
        </Link>
      </CardContent>
    </Card>
  );
};

export default VerifyEmail;
