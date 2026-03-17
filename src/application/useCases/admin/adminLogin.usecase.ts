import { LoginResponceDTO } from "@application/dto/Responce/loginResponce.dto";
import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { ForbiddenError } from "@application/errors/ForbidenError";
import { InvalidCredentialsError } from "@application/errors/InvalidCredentialsError";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { IAdminLoginUsecase } from "@application/ports/usecase/admin/IAdminLogin.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject } from "inversify";

export class AdminLoginUsecase implements IAdminLoginUsecase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.HashService)
    private readonly _hashService: IHashService,
    @inject(TYPES.TokenService)
    private readonly _tokenService: ITokenService,
  ) {}

  async execute(dto: loginUserDTO): Promise<LoginResponceDTO> {
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user) {
      throw new InvalidCredentialsError("Email or password is incorrect");
    }

    if (user.role !== "admin") {
      throw new ForbiddenError(
        "You do not have permission to perform this action",
      );
    }

    if (user.password == null) {
      throw new InvalidCredentialsError(
        "This account was created using Google. Please sign in with Google",
      );
    }
    const isPasswordValid = await this._hashService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError("Invalid password");
    }

    const payload = { userId: user.id, role: user.role };
    const accessToken = this._tokenService.generateAccessToken(payload);

    const { token: refreshToken } =
      this._tokenService.generateRefreshToken(payload);
    return { accessToken, refreshToken, role: user.role };
  }
}
