import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IUserUpdateProfileKeyUsecase } from "@application/ports/usecase/IUserUpdateProfileKey.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject } from "inversify";

export class UserUpdateProfileKeyUsecase
	implements IUserUpdateProfileKeyUsecase
{
	constructor(
		@inject(TYPES.UserRepository)
		private readonly _userRepository: IUserRepository,
	) {}

	async execute(userId: string, imageKey: string): Promise<void> {
		const user = await this._userRepository.findById(userId);

		if (!user) {
			throw new NotFoundError("user not found");
		}

		user.update({ profileImageKey: imageKey });

		await this._userRepository.save(userId, user);
	}
}
