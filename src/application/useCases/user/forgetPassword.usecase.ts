import { forgetPasswordDTO } from "@application/dto/user/forgetPassword.dto";
import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IEmailService } from "@application/ports/services/IEmailService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";

export class ForgetPassword implements IForgetPasswordUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _emailService: IEmailService,
    private _tokenService: ITokenService,
    private _tokenRepository: ITokenRepository,
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
