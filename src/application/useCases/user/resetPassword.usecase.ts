import type { resetPasswordDTO } from "@application/dto/user/resetPassword.dto";
import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import type { ITokenCache } from "@application/ports/cache/ITokenCache";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IHashService } from "@application/ports/services/IHashService";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class ResetPasswordUsecase implements IResetPassswordUsecase {
	constructor(
		@inject(TYPES.TokenRepository)
		private readonly _tokenRepository: ITokenCache,
		@inject(TYPES.HashService) private readonly _hashService: IHashService,
		@inject(TYPES.UserRepository)
		private readonly _userRepository: IUserRepository,
		@inject(TYPES.TokenService)
		private readonly _tokenService: ITokenService,
	) {}
	execute = async (dto: resetPasswordDTO): Promise<void> => {
		// hash the token
		console.log("hdhid");
		const hashedToken = this._tokenService.hashToken(dto.token);
		// check if the hash exist in the db
		const userId = await this._tokenRepository.getUserIdByToken(hashedToken);
		console.log(userId);
		// if not then thorow an errro invalid token
		if (!userId) {
			throw new InvalidTokenError("invalid or expired token");
		}
		// hash the password
		const hashedPassword = await this._hashService.hash(dto.password);
		// store the hashed  password in the db
		await this._userRepository.update(userId, {
			password: hashedPassword,
		});
		// delete the token
		await this._tokenRepository.deleteToken(hashedToken);
	};
}
