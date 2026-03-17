import { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import { User } from "@domain/entities/user";

export interface IGetUsersUsecase {
  execute(dto: getUsersDTO): Promise<User[]>;
}
