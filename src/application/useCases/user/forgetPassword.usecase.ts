import { forgetPasswordDTO } from '@application/dto/user/forgetPassword.dto';
import { ITokenCache } from '@application/ports/cache/ITokenCache';
import { IUserRepository } from '@application/ports/repository/IUserRepository';
import { IEmailService } from '@application/ports/services/IEmailService';
import { ITokenService } from '@application/ports/services/ITokenService';
import { IForgetPasswordUsecase } from '@application/ports/usecase/IForgetPassword.usercase';
import { emailServiceProb } from '@application/types/EmailPaylod.type';
import { TYPES } from '@config/DI-container/TYPES';
import { EnvConfig } from '@config/env';
import { injectable, inject } from 'inversify';

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.EmailService) private _emailService: IEmailService,
    @inject(TYPES.TokenService) private _tokenService: ITokenService,
    @inject(TYPES.TokenRepository) private _tokenRepository: ITokenCache,
  ) {}
  execute = async (dto: forgetPasswordDTO): Promise<{ email: string }> => {
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user) {
      return { email: dto.email };
    }
    const token = this._tokenService.getVerifyToken(user.id);
    const hash = this._tokenService.hashToken(token);

    // store the hash in the db
    await this._tokenRepository.saveToken(hash, user.id, 900);

    console.log(token);
    // todo send email to the user .with the token
    // this._emailService.sendVerificationEmail();
    const verificationLink = `${EnvConfig.CLIENT_BASE_URL}/auth/reset-password?token=${token}`;
    const data: emailServiceProb = {
      to: dto.email,
      subject: 'Reset your Mentor Marketplace Password',
      fallback: `You requested a password reset. Please set a new password by going to this link: ${verificationLink}. If you did not request this, please ignore this email.`,
      html: `
          <h2>Password Reset Request</h2>
          <p>We received a request to reset the password for your Mentor Marketplace account.</p>
          <p>Please click the button below to set a new password. This link will expire soon.</p>
          <br/>
          <a href="${verificationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
            <strong>Reset Password</strong>
          </a>
          <br/><br/>
          <p style="font-size: 12px; color: #666;">
            If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        `,
    };
    await this._emailService.sendMail(data);

    return { email: dto.email };
  };
}
