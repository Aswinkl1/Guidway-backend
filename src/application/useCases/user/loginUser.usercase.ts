import { LoginResponceDTO } from "@application/dto/Responce/loginResponce.dto";
import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { InvalidCredentialsError } from "@application/errors/InvalidCredentialsError";
import { IPrismaRepository } from "@application/ports/repository/IPrismaTokenRepository";
import { ITokenCache } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { ITokenService } from "@application/ports/services/ITokenService";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { User } from "@domain/entities/user";
import { UserNotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class LoginUsecase implements ILoginUsecase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
    @inject(TYPES.HashService) private readonly _hashService: IHashService,
    @inject(TYPES.TokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.PrismaTokenRepository)
    private readonly _prismaTokenRepo: IPrismaRepository,
  ) {}
  execute = async (dto: loginUserDTO): Promise<LoginResponceDTO> => {
    //TODO : later change this to env
    const REFRESH_TOKEN_EXPIRY_DAYS = 7;
    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
    );
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

    // TODO : store the refresh token in the possgress db
    // this._tokenRepo.saveToken(hash, payload, 604800); // 7 days
    // TODO :user agenet should be implemented
    // await this._prismaTokenRepo.create({
    //   token: hash,
    //   userId: user.id,
    //   expiresAt,
    // });
    // if everthing is okey send response
    return { role: user.role, accessToken, refreshToken };
  };
}
