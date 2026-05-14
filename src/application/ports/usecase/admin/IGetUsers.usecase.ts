import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { UserOutputDTO } from "@application/mappers/userMapper";
import type { PaginatedResult } from "@application/types/paginationResult.types";

export interface IGetUsersUsecase {
	execute(dto: getUsersDTO): Promise<PaginatedResult<UserOutputDTO>>;
}
