import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { listMentorDto } from "@application/dto/mentor/listMentor.dto";
import type {
	IMentorRepository,
	outputType,
} from "@application/ports/repository/IMentorRepository";
import type {
	CursorPaginatedResult,
	PaginatedResult,
} from "@application/types/paginationResult.types";
import { TYPES } from "@config/DI-container/TYPES";
import { Mentor } from "@domain/mentor/mentor.entity";
import type {
	Prisma,
	PrismaClient,
	Mentor as PrismaMentor,
} from "generated/prisma/client";
import { inject, injectable } from "inversify";
import { BaseRepository } from "./BaseRepository";

type UpdateInput = Prisma.MentorUpdateInput;
type CreateInput = Prisma.MentorCreateInput;
@injectable()
export default class MentorRepository
	extends BaseRepository<PrismaMentor, Mentor, CreateInput, UpdateInput>
	implements IMentorRepository
{
	constructor(@inject(TYPES.PrismaClient) private _prisma: PrismaClient) {
		super(_prisma.mentor);
	}

	async findAll(filter: getUsersDTO): Promise<PaginatedResult<outputType>> {
		const { search, page, limit, isBlocked, isVerified, role } = filter;
		const where: Prisma.MentorWhereInput = {};

		where.user = {
			is: {
				...(search && {
					OR: [
						{ name: { contains: search, mode: "insensitive" } },
						{ email: { contains: search, mode: "insensitive" } },
					],
				}),
				...(isBlocked !== undefined && { isBlocked }),
				...(isVerified !== undefined && { isVerified }),
				...(role && { role }),
			},
		};

		const [mentor, totalItems] = await Promise.all([
			this._prisma.mentor.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: "desc" },
				include: {
					user: {
						select: {
							name: true,
							email: true,
							profileImageKey: true,
							phoneNumber: true,
							isBlocked: true,
							isVerified: true,
						},
					},
				},
			}),
			this._prisma.mentor.count({ where }),
		]);
		console.log("mentor", mentor);
		return {
			data: mentor.map((user) => {
				console.log("sinde repo", user);
				return { mentor: this.toDomain(user), user: user.user };
			}),
			totalItems,
		};
	}

	async findAllWithCursor(
		filter: listMentorDto,
	): Promise<CursorPaginatedResult<outputType>> {
		const { cursor, limit, search, domainId, isVerified, status } = filter;
		const where: Prisma.MentorWhereInput = {};
		if (search) {
			where.OR = [
				{
					user: { name: { contains: search, mode: "insensitive" } },
				},
				{
					domain: {
						domainName: { contains: search, mode: "insensitive" },
					},
				},
			];
		}

		if (domainId) {
			where.domainId = domainId;
		}
		if (isVerified) {
			where.isVerified = isVerified;
		}

		if (status) {
			where.status = status;
		}
		where.user = {
			isBlocked: false,
		};

		const mentors = await this._prisma.mentor.findMany({
			where,
			take: limit + 1,
			...(cursor && {
				skip: 1,
				cursor: { userId: cursor },
			}),
			orderBy: [{ createdAt: "desc" }, { userId: "desc" }],
			include: {
				user: {
					select: {
						name: true,
						email: true,
						profileImageKey: true,
						phoneNumber: true,
						isBlocked: true,
						isVerified: true,
					},
				},
				sessions: {
					select: {
						price: true,
					},
					orderBy: { price: "asc" },
					take: 1,
				},
			},
		});

		const hasNext = mentors.length > limit;
		if (hasNext) mentors.pop();
		const nextCursor = hasNext ? mentors[mentors.length - 1].userId : null;
		return {
			data: mentors.map((v) => {
				return {
					mentor: this.toDomain(v),
					user: v.user,
					startingAt: v.sessions[0].price,
				};
			}),
			hasNext,
			nextCursor,
		};
	}

	async findMentorByUserId(userId: string): Promise<Mentor | null> {
		const mentor = await this._prisma.mentor.findUnique({ where: { userId } });
		if (!mentor) {
			return null;
		}
		return this.toDomain(mentor);
	}

	async update(userId: string, data: Partial<Mentor>): Promise<Mentor> {
		const persitenceData = this.toPersistence(data);
		const record = await this._prisma.mentor.update({
			where: { userId },
			data: persitenceData,
		});

		return this.toDomain(record);
	}

	protected toDomain(record: PrismaMentor) {
		return Mentor.create(record);
	}

	protected toPersistence(
		mentorDetails: Partial<Mentor>,
	): Omit<Prisma.MentorCreateInput, "createdAt" | "updatedAt"> {
		// const mentorDetails = mentorEntity.toPrimitive();
		return {
			user: { connect: { id: mentorDetails.userId } },
			status: mentorDetails.status,
			domain: mentorDetails.domainId
				? { connect: { id: mentorDetails.domainId } }
				: undefined,
			headline: mentorDetails.headline,
			isVerified: mentorDetails.isVerified,
			reviewCount: mentorDetails.reviewCount,
			stripeAccountId: mentorDetails.stripeAccountId,
			stripeOnboardingComplete: mentorDetails.stripeOnboardingComplete,
			shortBio: mentorDetails.shortBio,
			slotDurationMinutes: mentorDetails.slotDurationMinutes,
		};
	}
}
