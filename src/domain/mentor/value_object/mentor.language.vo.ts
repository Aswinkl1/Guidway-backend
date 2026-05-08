import { NotFoundError } from "@domain/errors/UserError";

export const PROFICIENCY_LEVEL = {
	NATIVE: "NATIVE",
	FLUENT: "FLUENT",
	CONVERSATIONAL: "CONVERSATIONAL",
	BASIC: "BASIC",
} as const;

export type ProficiencyLevel =
	(typeof PROFICIENCY_LEVEL)[keyof typeof PROFICIENCY_LEVEL];

interface IMentorLanguageProps {
	mentorId: string;
	languageId: string;
	proficiency: ProficiencyLevel;
}

export class MentorLanguageVO {
	private constructor(public readonly props: IMentorLanguageProps) {}

	static create(props: IMentorLanguageProps) {
		if (!props.mentorId) {
			throw new NotFoundError("mentorId not found");
		}

		if (!props.languageId) {
			throw new NotFoundError("languageId not found");
		}

		if (!props.proficiency) {
			throw new NotFoundError("proficiency not found");
		}

		if (!Object.values(PROFICIENCY_LEVEL).includes(props.proficiency)) {
			throw new Error("Invalid proficiency level");
		}

		return new MentorLanguageVO(props);
	}
}
