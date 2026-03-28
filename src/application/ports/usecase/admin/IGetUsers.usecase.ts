import type {
  getUsersDTO,
  PaginatedResult,
} from "@application/dto/admin/GetUsers.dto";
import type { UserOutputDTO } from "@application/mappers/userMapper";

export interface IGetUsersUsecase {
  execute(dto: getUsersDTO): Promise<PaginatedResult<UserOutputDTO>>;
}
