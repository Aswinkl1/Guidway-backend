import type { editProfileDTO } from "@application/dto/user/EditProfile.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import {
	UserProfileMapper,
	type UserProfileOutputDTO,
} from "@application/mappers/user-profile.mapper";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IEditUserProfileUsecase } from "@application/ports/usecase/IEditUserProfile.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class EditUserProfileUsecase implements IEditUserProfileUsecase {
	constructor(
		@inject(TYPES.UserRepository)
		private readonly _userRepository: IUserRepository,
	) {}

	async execute(
		userId: string,
		dto: editProfileDTO,
	): Promise<UserProfileOutputDTO> {
		const user = await this._userRepository.findById(userId);
		if (!user) {
			throw new NotFoundError("user not found");
		}

		user.update(dto);

		const updatedUser = await this._userRepository.save(user.id, user);

		return UserProfileMapper.toOutputDto(updatedUser);
	}
}
