export interface IEmailService {
  sendVerificationEmail(
    To: string,
    subject: string,
    token: string,
  ): Promise<void>;
}
