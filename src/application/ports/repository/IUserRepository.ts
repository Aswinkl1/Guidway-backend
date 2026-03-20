import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { signupUserDTO } from "@application/dto/user/signupUser.dto";
import type { User } from "@domain/entities/user";

export interface IUserRepository {
	create(user: signupUserDTO): Promise<User>;
	findByEmail(email: string): Promise<User | null>;
	update(userId: string, user: Partial<User>): Promise<User>;
	findById(id: string): Promise<User | null>;
	findAll(filter?: getUsersDTO): Promise<User[]>;
}
