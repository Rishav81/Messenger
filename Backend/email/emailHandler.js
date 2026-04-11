import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Welcome to Messenger!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Filed to send welcome email");
  }

  console.log("Welcome email send successfully", data);
};
