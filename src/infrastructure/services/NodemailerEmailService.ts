import { IEmailService } from "@application/ports/services/IEmailService";
import { EnvConfig } from "@config/env";
import nodemailer from "nodemailer";
export class NodemailerEmailService implements IEmailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: EnvConfig.NODEMAIL_EMAIL,
        pass: EnvConfig.NODEMAIL_PASSWORD,
      },
    });
  }
  async sendVerificationEmail(toAddress: string, token: string): Promise<void> {
    const verificationLink = `${EnvConfig.BASE_URL}/${EnvConfig.API_VERSION}/verify?token=${token}`;
    try {
      // 2. Send the message
      const info = await this.transporter.sendMail({
        from: `"Mentor Marketplace" <${process.env.SMTP_USER}>`,
        to: toAddress,
        subject: "Verify your Mentor Marketplace Account ✔",
        text: `Welcome! Please verify your email by going to this link: ${verificationLink}`, // Fallback plain text
        html: `
          <h2>Welcome to the Mentor Marketplace!</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            <strong>Verify Email</strong>
          </a>
        `,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.error("Error while sending mail", err);
      throw new Error("Failed to send verification email.");
    }
  }
}
