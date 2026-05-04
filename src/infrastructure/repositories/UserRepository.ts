import type {
	getUsersDTO,
	PaginatedResult,
} from "@application/dto/admin/GetUsers.dto";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import { TYPES } from "@config/DI-container/TYPES";
import { User } from "@domain/user/user";
import type {
	Prisma,
	PrismaClient,
	User as PrismaUser,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";

type CreateInput = Prisma.UserCreateInput;
type UpdateInput = Prisma.UserUpdateInput;

@injectable()
export class UserRepository
	extends BaseRepository<PrismaUser, User, CreateInput, UpdateInput>
	implements IUserRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.user);
	}
	getUserCountByDate(date: Date): Promise<number> {
		const count = this._prisma.user.count({ where: { createdAt: date } });

		return count;
	}

	async findAll(filter: getUsersDTO): Promise<PaginatedResult<User>> {
		const { search, page, limit, isBlocked, isVerified, role } = filter;
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

		if (role) {
			where.role = role;
		}

		const [users, totalItems] = await Promise.all([
			this._prisma.user.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
			}),
			this._prisma.user.count({ where }),
		]);

		return {
			data: users.map((user) => this.toDomain(user)),
			totalItems,
		};
	}

	findByEmail = async (email: string): Promise<User | null> => {
		console.log("Finding user by email:", email); // Debug log
		const user = await this._prisma.user.findUnique({ where: { email } });
		if (!user) {
			return null;
		}
		return this.toDomain(user);
	};

	update = async (userId: string, user: Partial<User>): Promise<User> => {
		// update the user with the id
		const userRecord = await this._prisma.user.update({
			where: { id: userId },
			data: user,
		});
		return this.toDomain(userRecord);
	};

	findUserByProviderId = async (providerId: string): Promise<User | null> => {
		const user = await this._prisma.user.findFirst({
			where: { authProviderId: providerId },
		});
		if (!user) {
			return null;
		}
		return this.toDomain(user);
	};

	protected toDomain(user: PrismaUser): User {
		return new User({
			id: user.id,
			email: user.email,
			name: user.name,
			password: user.password,
			phoneNumber: user.phoneNumber,
			profileImageKey: user.profileImageKey,
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

	protected toPersistence(
		userEntity: User,
	): Omit<PrismaUser, "createdAt" | "updatedAt"> {
		return {
			id: userEntity.id,
			email: userEntity.email,
			name: userEntity.name,
			password: userEntity.password,
			phoneNumber: userEntity.phoneNumber,
			profileImageKey: userEntity.profileImageKey,
			authProviderId: userEntity.authProviderId,
			role: userEntity.role,
			isDeleted: userEntity.isDeleted,
			isVerified: userEntity.isVerified,
			isBlocked: userEntity.isBlocked,
			timezone: userEntity.timezone,
		};
	}
}
