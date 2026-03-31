import type {
  loginOutputDTO,
  loginUserInputDTO,
} from "@application/dto/user/loginUser.dto";
import { InvalidCredentialsError } from "@application/errors/InvalidCredentialsError";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IHashService } from "@application/ports/services/IHashService";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { TYPES } from "@config/DI-container/TYPES";

import { inject, injectable } from "inversify";

@injectable()
export class LoginUsecase implements ILoginUsecase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.HashService) private readonly _hashService: IHashService,
    @inject(TYPES.TokenService) private readonly _tokenService: ITokenService,
  ) {}
  execute = async (dto: loginUserInputDTO): Promise<loginOutputDTO> => {
    //TODO : later change this to env

    // check if the email exists
    const user = await this._userRepository.findByEmail(dto.email);

    // if not usernot found error
    if (!user) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    if (user.password == null) {
      throw new InvalidCredentialsError(
        "This account was created using Google. Please sign in with Google",
      );
    }

    // check if the password matches
    const isMatch = await this._hashService.compare(
      dto.password,
      user.password,
    );
    // if not password doest match
    if (!isMatch) {
      throw new InvalidCredentialsError("Invalid email or password");
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = this._tokenService.generateAccessToken(payload);

    const { token: refreshToken } =
      this._tokenService.generateRefreshToken(payload);

    // if everthing is okey send response
    return { role: user.role, accessToken, refreshToken };
  };
}
