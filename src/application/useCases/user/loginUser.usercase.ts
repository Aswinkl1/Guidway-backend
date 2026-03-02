import { LoginResponceDTO } from "@application/dto/Responce/loginResponce.dto";
import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { User } from "@domain/entities/user";
import { UserNotFoundError } from "@domain/errors/UserError";

export class LoginUsecase implements ILoginUsecase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _hashService: IHashService,
    private readonly _tokenService: ITokenService,
  ) {}
  execute = async (dto: loginUserDTO): Promise<LoginResponceDTO> => {
    // check if the email exists
    const user = await this._userRepository.findByEmail(dto.email);

    // if not usernot found error
    if (!user) {
      throw new UserNotFoundError(dto.email);
    }

    if (user.password == null) {
      throw new Error("user uses goodgle auth");
    }

    // check if the password matches
    const isMatch = await this._hashService.compare(
      dto.password,
      user.password,
    );
    // if not password doest match
    if (!isMatch) {
      throw new Error("password doesn't match ");
    }
    console.log("user is here", user);
    const accessToken = this._tokenService.generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const { token: refreshToken, hash } =
      this._tokenService.generateRefreshToken();

    // if everthing is okey send response
    return { user, accessToken, refreshToken };
  };
}
