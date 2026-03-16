import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import { NotFoundError } from "@application/errors/NotFoundError";
import { IPrismaRepository } from "@application/ports/repository/IPrismaTokenRepository";
import { ITokenCache } from "@application/ports/repository/ITokenRepository";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { ITokenService } from "@application/ports/services/ITokenService";
import { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { UserNotFoundError } from "@domain/errors/UserError";

import { Role } from "generated/prisma/enums";
import { inject, injectable } from "inversify";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    @inject(TYPES.TokenService) private readonly _tokenService: ITokenService,
    @inject(TYPES.UserRepository)
    private readonly _userRepo: IUserRepository,
  ) {}
  async execute(token: string): Promise<{ accessToken: string; role: Role }> {
    try {
      // check is the token is verifyed
      const payload = await this._tokenService.verifyRefreshToken(token);

      // check if the user is blocked
      const user = await this._userRepo.findById(payload.id);
      console.log("refresh ethii too");
      if (!user) {
        throw new NotFoundError("user not found");
      }
      // if block error
      if (user?.isBlocked) {
        throw new Error("user blocked by the admin");
      }

      const accessToken = this._tokenService.generateAccessToken({
        userId: user.id,
        role: user.role,
      });
      // if not then create a accesstoken and send it back
      return { accessToken, role: user.role };
    } catch (error) {
      console.log(error);
      // give a custom error for token expire so that we can just rend the res on that way
      throw error;
    }
  }
}
