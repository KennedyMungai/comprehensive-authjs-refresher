import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token-queries";
import PasswordResetForm from "@/app/(auth)/signin/password-reset/_components/password_reset_form";

type Props = {
  searchParams: {
    token?: string;
  };
};

const PasswordResetPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  const passwordResetToken = await getPasswordResetTokenByToken(token!);

  if (passwordResetToken.token !== token) {
    return (
      <Card className="h-56 w-96">
        <CardHeader>
          <CardTitle>Invalid Token</CardTitle>
          <CardDescription>The password reset token is invalid</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <PasswordResetForm />;
};

export default PasswordResetPage;
