import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { User } from "@domain/entities/user";
import { PrismaClient } from "generated/prisma/client";

export class UserRepository implements IUserRepository {
  constructor(private _prisma: PrismaClient) {}
  create = async (user: signupUserDTO): Promise<Omit<User, "password">> => {
    console.log("repo", user);
    const record = await this._prisma.user.create({
      data: {
        name: user.name,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        email: user.email,
      },
    });
    const newUser = new User(record);

    // 2. Strip the password out at runtime using JavaScript destructuring
    const { password, ...userWithoutPassword } = newUser;

    // 3. Return the clean object
    return userWithoutPassword;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const user = await this._prisma.user.findUnique({ where: { email } });
    console.log(user);
    return user ? new User(user) : null;
  };
}
