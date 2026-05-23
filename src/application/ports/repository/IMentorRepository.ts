import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { listMentorDto } from "@application/dto/mentor/listMentor.dto";
import type {
	CursorPaginatedResult,
	PaginatedResult,
} from "@application/types/paginationResult.types";
import type { Mentor } from "@domain/mentor/mentor.entity";
import type { User } from "@domain/user/user";
import type { IBaseRepository } from "./IBaseRepository";

export type outputType = {
	mentor: Pick<
		Mentor,
		| "userId"
		| "isVerified"
		| "createdAt"
		| "averageRating"
		| "status"
		| "domainId"
		| "headline"
		| "reviewCount"
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
	update(userId: string, data: Partial<Mentor>): Promise<Mentor>;
	findAllWithCursor(
		filter: listMentorDto,
	): Promise<CursorPaginatedResult<outputType>>;
}
