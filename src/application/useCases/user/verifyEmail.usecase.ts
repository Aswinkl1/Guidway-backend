import { ITokenCache } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";
@injectable()
export class VerifyEmailUseCase implements IVerifyEmailUsecase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.TokenRepository) private _tokenRepository: ITokenCache,
  ) {}
  async execute(dto: string): Promise<{ message: string }> {
    // find if the token is exits in the repository
    const userId = await this._tokenRepository.getUserIdByToken(dto);

    // if not then send error meesage
    if (!userId) {
      throw new Error("invalid token or expired token");
    }

    // change the user to verify
    await this._userRepository.update(userId, { isVerified: true });
    // delete the token from the repository
    await this._tokenRepository.deleteToken(dto);
    // send the responce back
    return { message: "user verifyed succesfull" };
  }
}
