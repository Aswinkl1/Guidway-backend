import { APP_ERRORS_MESSAGES } from "@application/constant/errorMessage";
import type { loginOutputDTO } from "@application/dto/user/loginUser.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import type { Role } from "@domain/user/user";

import { inject, injectable } from "inversify";

@injectable()
export class RefreshTokenUsecase implements IRefreshTokenUsecase {
	constructor(
		@inject(TYPES.TokenService) private readonly _tokenService: ITokenService,
		@inject(TYPES.UserRepository)
		private readonly _userRepo: IUserRepository,
	) {}
	async execute(token: string): Promise<Omit<loginOutputDTO, "refreshToken">> {
		try {
			// check is the token is verifyed
			const payload = await this._tokenService.verifyRefreshToken(token);

			// check if the user is blocked
			const user = await this._userRepo.findById(payload.userId);

			if (!user) {
				throw new NotFoundError(APP_ERRORS_MESSAGES.USER.NOT_FOUND);
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
			return {
				accessToken,
				role: user.role,
				name: user.name,
				profileImageKey: user.profileImageKey,
			};
		} catch (error) {
			console.log(error);
			// give a custom error for token expire so that we can just rend the res on that way
			throw error;
		}
	}
}
