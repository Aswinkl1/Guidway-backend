import { v4 as uuid } from "uuid";

export const SkillStatus = {
	ACTIVE: "ACTIVE",
	PENDING_REVIEW: "PENDING_REVIEW",
	REJECTED: "REJECTED",
} as const;

export type SkillStatus = (typeof SkillStatus)[keyof typeof SkillStatus];
export interface ISkill {
	id: string;
	name: string;
	status: SkillStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateSkillProps
	extends Omit<ISkill, "id" | "createdAt" | "updatedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Skill {
	private constructor(private props: ISkill) {}

	static create(props: CreateSkillProps) {
		if (!props.name || props.name.trim().length === 0) {
			throw new Error("Skill name cannot be empty");
		}

		const finalProps: ISkill = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		};

		return new Skill(finalProps);
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get status() {
		return this.props.status;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}
}
