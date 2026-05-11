import type {
	ISocialLinks,
	SocialLinks,
} from "@domain/mentor/entities/socialLink.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface ISocialLinkRepository
	extends IBaseRepository<
		SocialLinks,
		Partial<SocialLinks>,
		Partial<SocialLinks>
	> {
	deleteAll(metornId: string): Promise<void>;
	createMany(
		mentorId: string,
		data: Pick<ISocialLinks, "platform" | "url">[],
	): Promise<SocialLinks[]>;
}
