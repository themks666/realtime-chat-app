import { Resend } from 'resend';
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import { config } from "dotenv";
config()
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async function (emailTo) {
  const { data, error } = await resend.emails.send({
    from: process.env.NODE_ENV == "development"? 'onboarding@resend.dev' :process.env.EMAIL_FROM,
    to: emailTo,
    subject: 'Hello World',
    html: createWelcomeEmailTemplate("manish", emailTo),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};