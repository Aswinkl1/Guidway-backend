import type { outputType } from "@application/ports/repository/IMentorRepository";
import type { CursorPaginatedResult } from "@application/types/paginationResult.types";

type userData = {
	name: string;
	profileImageKey: string | null;
	domainId: string | null;
	headline: string | null;
	isVerified: boolean;
	avgRating: number;
	reviewCount: number;
};
export interface IMentorListOutputDto {
	data: userData[];
	meta: {
		nextCursor: string | null;
	};
}

export class MentorListMapper {
	static toOutput(data: outputType): userData {
		return {
			name: data.user.name,
			avgRating: data.mentor.averageRating,
			domainId: data.mentor.domainId,
			headline: data.mentor.headline,
			isVerified: data.mentor.isVerified,
			profileImageKey: data.user.profileImageKey,
			reviewCount: data.mentor.reviewCount,
		};
	}

	static toPaginatedResponse(
		data: CursorPaginatedResult<outputType>,
	): IMentorListOutputDto {
		return {
			data: data.data.map((v) => MentorListMapper.toOutput(v)),
			meta: { nextCursor: data.nextCursor },
		};
	}
}
