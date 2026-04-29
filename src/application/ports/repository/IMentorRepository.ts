import type {
	getUsersDTO,
	PaginatedResult,
} from "@application/dto/admin/GetUsers.dto";
import type { Mentor } from "@domain/mentor/mentor.entity";
import type { User } from "@domain/user/user";
import type { IBaseRepository } from "./IBaseRepository";

export type outputType = {
	mentor: Pick<
		Mentor,
		"userId" | "isVerified" | "createdAt" | "averageRating" | "status"
	>;
	user: Pick<
		User,
		| "name"
		| "email"
		| "phoneNumber"
		| "isBlocked"
		| "isVerified"
		| "profileImageKey"
	>;
};

export interface IMentorRepository
	extends IBaseRepository<Mentor, Partial<Mentor>, Partial<Mentor>> {
	findAll(filter?: getUsersDTO): Promise<PaginatedResult<outputType>>;
	findMentorByUserId(userId: string): Promise<Mentor | null>;
}
