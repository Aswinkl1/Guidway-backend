import { emailServiceProb } from "@application/types/EmailPaylod.type";

export interface IEmailService {
  sendVerificationEmail(toAddress: string, token: string): Promise<void>;
  sendMail(data: emailServiceProb): Promise<void>;
}
