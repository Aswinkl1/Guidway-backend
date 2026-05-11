import { NotFoundError } from "@domain/errors/UserError";
import { v4 as uuid } from "uuid";

export interface ISocialLinks {
	readonly id: string;
	mentorId: string;
	platform: string;
	url: string;
}

export interface CreateSocialLinks extends Omit<ISocialLinks, "id"> {
	id?: string;
}

export class SocialLinks {
	constructor(private props: ISocialLinks) {}

	static Create(props: CreateSocialLinks) {
		if (!props.platform || !props.url) {
			throw new NotFoundError("invalid props");
		}
		const finalProps = {
			...props,
			id: props.id ?? uuid(),
		};

		return new SocialLinks(finalProps);
	}
}
