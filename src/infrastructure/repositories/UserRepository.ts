import { getUsersDTO } from '@application/dto/admin/GetUsers.dto';
import { signupUserDTO } from '@application/dto/user/signupUser.dto';
import { IUserRepository } from '@application/ports/repository/IUserRepository';
import { TYPES } from '@config/DI-container/TYPES';
import { User } from '@domain/entities/user';
import { Prisma, PrismaClient } from 'generated/prisma/client';
import { inject, injectable } from 'inversify';
import { User as PrismaUser } from 'generated/prisma/client';
@injectable()
export class UserRepository implements IUserRepository {
  constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {}
  async findAll(filter: getUsersDTO): Promise<User[]> {
    const { search, page, limit, isBlocked, isVerified } = filter;
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (isBlocked !== undefined) {
      where.isBlocked = isBlocked;
    }

    if (isVerified !== undefined) {
      where.isVerified = isVerified;
    }

    const users = await this._prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return users.map((user) => UserRepository.toDomain(user));
  }

  async findById(id: string): Promise<User | null> {
    // TODO:figure out a way to remove the passwor while getting data even from db
    const user = await this._prisma.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return UserRepository.toDomain(user);
  }

  create = async (user: signupUserDTO): Promise<User> => {
    const userRecord = await this._prisma.user.create({
      data: {
        name: user.name,
        password: user.password,
        phoneNumber: user.phoneNumber,
        role: user.role,
        email: user.email,
      },
    });
    return UserRepository.toDomain(userRecord);
  };

  findByEmail = async (email: string): Promise<User | null> => {
    const user = await this._prisma.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    return UserRepository.toDomain(user);
  };

  update = async (userId: string, user: Partial<User>): Promise<User> => {
    // update the user with the id
    const userRecord = await this._prisma.user.update({
      where: { id: userId },
      data: user,
    });
    return UserRepository.toDomain(userRecord);
  };

  static toDomain(user: PrismaUser): User {
    return new User({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      phoneNumber: user.phoneNumber,
      profileImageUrl: user.profileImageUrl,
      authProviderId: user.authProviderId,
      role: user.role,
      isDeleted: user.isDeleted,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      timezone: user.timezone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
