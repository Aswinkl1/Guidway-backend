import { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { User } from "@domain/entities/user";

export interface IUserRepository {
  create(user: signupUserDTO): Promise<Omit<User, "password">>;
  findByEmail(email: string): Promise<User | null>;
  update(userId: string, user: Partial<User>): Promise<Omit<User, "password">>;
  findById(id: string): Promise<User | null>;
  findAll(filter?: getUsersDTO): Promise<any[]>;
}
