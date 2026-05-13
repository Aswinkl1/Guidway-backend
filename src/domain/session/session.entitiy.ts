import { v4 as uuid } from "uuid";

export interface ISessionProps {
	id: string;
	name: string;
	mentorId: string;
	duration: number;
	description: string;
	isActive: boolean;
	deletedAt?: Date | null;
	createdAt: Date;
	updatedAt: Date;
}

interface CreateSessionProps
	extends Omit<ISessionProps, "id" | "createdAt" | "updatedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
}

export class Session {
	constructor(private props: ISessionProps) {}

	static Create(props: CreateSessionProps) {
		const finalProps = {
			...props,
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
			deletedAt: props.deletedAt ?? null,
		};

		return new Session(finalProps);
	}

	get id() {
		return this.props.id;
	}
	get name() {
		return this.props.name;
	}
	get mentorId() {
		return this.props.mentorId;
	}
	get duration() {
		return this.props.duration;
	}
	get description() {
		return this.props.description;
	}
	get isActive() {
		return this.props.isActive;
	}
	get deletedAt() {
		return this.props.deletedAt;
	}
	get createdAt() {
		return this.props.createdAt;
	}
	get updatedAt() {
		return this.props.updatedAt;
	}
}
