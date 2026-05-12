import type { ChangePasswordDTO } from "@application/dto/user/changePassword.dto";
import { InvalidCredentialsError } from "@application/errors/InvalidCredentialsError";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IHashService } from "@application/ports/services/IHashService";
import type { IChangePasswordUsecase } from "@application/ports/usecase/mentor/IChangePassword.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { NotFoundError } from "@domain/errors/UserError";
import { inject, injectable } from "inversify";

@injectable()
export class ChangePasswordUsecase implements IChangePasswordUsecase {
	constructor(
		@inject(TYPES.UserRepository)
		private readonly _userRepository: IUserRepository,
		@inject(TYPES.HashService)
		private readonly _hashService: IHashService,
	) {}
	async execute(userId: string, dto: ChangePasswordDTO): Promise<void> {
		const user = await this._userRepository.findById(userId);

		if (!user) {
			throw new NotFoundError("user not found");
		}
		if (!user.password) {
			throw new Error("password not found user is a social media auth user");
		}
		const isValid = await this._hashService.compare(
			user.password,
			dto.oldPassword,
		);

		if (!isValid) {
			throw new InvalidCredentialsError("incorrect password");
		}

		const hashedPassword = await this._hashService.hash(dto.newPassword);
		user.update({ password: hashedPassword });

		await this._userRepository.save(userId, user);
	}
}
