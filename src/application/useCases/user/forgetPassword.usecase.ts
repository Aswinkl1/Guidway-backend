import { forgetPasswordDTO } from "@application/dto/user/forgetPassword.dto";
import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IEmailService } from "@application/ports/services/IEmailService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import { TYPES } from "@config/DI-container/TYPES";
import { injectable, inject } from "inversify";

@injectable()
export class ForgetPasswordUsecase implements IForgetPasswordUsecase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.EmailService) private _emailService: IEmailService,
    @inject(TYPES.TokenService) private _tokenService: ITokenService,
    @inject(TYPES.TokenRepository) private _tokenRepository: ITokenRepository,
  ) {}
  execute = async (dto: forgetPasswordDTO): Promise<{ email: string }> => {
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user) {
      return { email: dto.email };
    }
    const token = this._tokenService.getSecureToken();
    const hash = this._tokenService.hashToken(token);

    // store the hash in the db
    await this._tokenRepository.saveToken(hash, user.id, 900);

    console.log(token);
    //todo send email to the user .with the token
    // this._emailService.sendVerificationEmail();
    console.log("tokososososo");
    return { email: dto.email };
  };
}
