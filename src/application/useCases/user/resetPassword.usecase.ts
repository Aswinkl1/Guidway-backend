import { APP_ERRORS_MESSAGES } from "@application/constant/errorMessage";
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
		const hashedToken = this._tokenService.hashToken(dto.token);

		const userId = await this._tokenRepository.getUserIdByToken(hashedToken);

		if (!userId) {
			throw new InvalidTokenError(APP_ERRORS_MESSAGES.TOKEN.INVALID_OR_EXPIRED);
		}

		const hashedPassword = await this._hashService.hash(dto.password);

		await this._userRepository.update(userId, {
			password: hashedPassword,
		});

		await this._tokenRepository.deleteToken(hashedToken);
	};
}
