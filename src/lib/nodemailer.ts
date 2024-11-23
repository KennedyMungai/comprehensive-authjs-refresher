import "server-only";

import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NODEMAILER_GOOGLE_SMTP_USER,
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    accessToken: process.env.NODEMAILER_GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
  },
});
