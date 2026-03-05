import { resetPasswordDTO } from "@application/dto/user/resetPassword.dto";
import { ITokenRepository } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class ResetPasswordUsecase implements IResetPassswordUsecase {
  constructor(
    @inject(TYPES.TokenRepository)
    private readonly _tokenRepository: ITokenRepository,
    @inject(TYPES.HashService) private readonly _hashService: IHashService,
    @inject(TYPES.UserRepository)
    private readonly _userRepository: IUserRepository,
  ) {}
  execute = async (dto: resetPasswordDTO): Promise<void> => {
    // check if the token exist in the db
    const userId = await this._tokenRepository.getUserIdByToken(dto.token);

    // if not then thorow an errro invalid token
    if (!userId) {
      throw new Error("token expired or invalid");
    }
    // hash the password
    const hashedPassword = await this._hashService.hash(dto.password);
    // store the hashed  password in the db
    await this._userRepository.update(userId, {
      password: hashedPassword,
    });
    // delete the token
    await this._tokenRepository.deleteToken(dto.token);
  };
}
