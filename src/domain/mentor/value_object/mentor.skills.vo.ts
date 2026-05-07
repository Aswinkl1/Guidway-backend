import { NotFoundError } from "@domain/errors/UserError";

interface IMentorSKillProps {
	mentorId: string;
	skillId: string;
	yearsExperience: number;
}

export class MentorSkillVO {
	private constructor(public readonly prosp: IMentorSKillProps) {}

	static create(props: IMentorSKillProps) {
		if (!props.mentorId) {
			throw new NotFoundError("mentorId not found");
		}
		if (!props.skillId) {
			throw new NotFoundError("skillId not found");
		}

		return new MentorSkillVO(props);
	}
}
