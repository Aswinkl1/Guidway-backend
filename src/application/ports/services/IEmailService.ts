export interface IEmailService {
  sendVerificationEmail(toAddress: string, token: string): Promise<void>;
}
