import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IEmailService } from "@application/ports/services/IEmailService";
import { IHashService } from "@application/ports/services/IHashService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { UserAlreadyExistsError } from "@domain/errors/UserError";

export class SignUpUser implements ISignUpUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashService,
    private _tokenService: ITokenService,
    private _tokenRepository: ITokenRepository,
    private _emailService: IEmailService,
  ) {}

  execute = async (data: signupUserDTO) => {
    const exists = await this._userRepository.findByEmail(data.email);
    if (exists) {
      throw new UserAlreadyExistsError(data.email);
    }

    data.password = await this._hashService.hash(data.password);
    const savedUser = await this._userRepository.create(data);

    const verificationToken = this._tokenService.getSecureToken();

    await this._tokenRepository.saveToken(
      verificationToken,
      savedUser.id,
      86400,
    );

    await this._emailService.sendVerificationEmail(
      savedUser.email,
      verificationToken,
    );

    return {
      message: "account created succesfully",
      savedUser,
    };
  };
}
