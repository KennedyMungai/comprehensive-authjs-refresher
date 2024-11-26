import { transport } from "@/lib/nodemailer";

type Props = {
  email: string;
  token: string;
};

export const sendResetUserEmail = async ({ email, token }: Props) =>
  await transport.sendMail({
    from: `"Comprehensive Auth App" <${process.env.NODEMAILER_GOOGLE_SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${process.env.NEXT_PUBLIC_APP_URL}/signin/password-reset?token=${token}">here</a> to reset your password.</p>`,
  });
