import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import {
	UserMapper,
	type UserOutputDTO,
} from "@application/mappers/userMapper";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class GetUsersUsecase implements IGetUsersUsecase {
	constructor(
		@inject(TYPES.UserRepository)
		private readonly _userRepository: IUserRepository,
	) {}
	async execute(dto: getUsersDTO): Promise<UserOutputDTO[]> {
		// pass the filter to the repository
		const users = await this._userRepository.findAll(dto);

		// return the users
		return users.map((user) => UserMapper.toResponseDTO(user));
	}
}
