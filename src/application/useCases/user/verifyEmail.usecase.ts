import { APP_ERRORS_MESSAGES } from "@application/constant/errorMessage";
import type { ITokenCache } from "@application/ports/cache/ITokenCache";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
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
		console.log(userId);
		// if not then send error meesage
		if (!userId) {
			throw new Error(APP_ERRORS_MESSAGES.TOKEN.INVALID_OR_EXPIRED);
		}

		// change the user to verify
		await this._userRepository.update(userId, { isVerified: true });
		// delete the token from the repository
		await this._tokenRepository.deleteToken(dto);
		// send the responce back
		return { message: "user verifyed succesfull" };
	}
}
