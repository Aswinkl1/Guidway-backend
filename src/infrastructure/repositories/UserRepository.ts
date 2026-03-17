import { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { TYPES } from "@config/DI-container/TYPES";
import { User } from "@domain/entities/user";
import { Prisma, PrismaClient } from "generated/prisma/client";
import { inject, injectable } from "inversify";
@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {}
  async findAll(filter: getUsersDTO): Promise<any[]> {
    const { search, page, limit, isBlocked, isVerified } = filter;
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (isBlocked !== undefined) {
      where.isBlocked = isBlocked;
    }

    if (isVerified !== undefined) {
      where.isVerified = isVerified;
    }

    return await this._prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isBlocked: true,
        isVerified: true,
        profileImageUrl: true,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    // TODO:figure out a way to remove the passwor while getting data even from db
    const user = await this._prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundError("user not found");
    }
    const newUser = new User(user);
    return newUser ?? null;
  }

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

  update = async (
    userId: string,
    user: Partial<User>,
  ): Promise<Omit<User, "password">> => {
    // update the user with the id
    const record = await this._prisma.user.update({
      where: { id: userId },
      data: user,
    });

    const newUser = new User(record);

    // 2. Strip the password out at runtime using JavaScript destructuring
    const { password, ...userWithoutPassword } = newUser;

    // 3. Return the clean object
    return userWithoutPassword;
  };
}
