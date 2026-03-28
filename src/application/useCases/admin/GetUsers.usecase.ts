import type {
  getUsersDTO,
  PaginatedResult,
} from "@application/dto/admin/GetUsers.dto";
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
  async execute(dto: getUsersDTO): Promise<PaginatedResult<UserOutputDTO>> {
    // pass the filter to the repository
    console.log(dto);
    const { data, totalItems } = await this._userRepository.findAll(dto);

    // return the users
    return {
      data: data.map((user) => UserMapper.toResponseDTO(user)),
      totalItems,
    };
  }
}
