import type {
	OAuthInputDTO,
	OAuthOutputDTO,
} from "@application/dto/user/OAuth.dto";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { IOAuthUseCase } from "@application/ports/usecase/IOAuth.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import type { User } from "@domain/user/user";
import { inject } from "inversify";

export class OAuthUseCase implements IOAuthUseCase {
	constructor(
		@inject(TYPES.UserRepository) private readonly _userRepo: IUserRepository,
		@inject(TYPES.TokenService)
		private readonly _tokenService: ITokenService,
	) {}
	execute = async (dto: OAuthInputDTO): Promise<OAuthOutputDTO> => {
		//find the user by provider id
		let user: User | null;
		user = await this._userRepo.findUserByProviderId(dto.providerId);
		if (!user) {
			const existingUser = await this._userRepo.findByEmail(dto.email);
			if (existingUser) {
				//update the provider id
				user = await this._userRepo.update(existingUser.id, {
					authProviderId: dto.providerId,
				});
			}
		}

		//find the user by email

		// if user not found then create a new user
		if (!user) {
			user = await this._userRepo.create({
				email: dto.email,
				name: dto.name,
				authProviderId: dto.providerId,
				role: dto.role,
			});
		}

		const payload = { userId: user.id, role: user.role };
		const { token: refreshToken } =
			this._tokenService.generateRefreshToken(payload);

		return { refreshToken };
	};
}
