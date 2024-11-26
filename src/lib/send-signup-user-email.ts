import "server-only";
import { transport } from "@/lib/nodemailer";

type Props = {
  email: string;
  token: string;
};

export const sendSignupUserEmail = async ({ email, token }: Props) =>
  await transport.sendMail({
    from: `"Comprehensive Auth App" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/signup/verify-email?token=${token}">here</a> to verify your email address.</p>`,
  });
