import { v4 as uuid } from "uuid";

export interface ISessionProps {
	id: string;
	name: string;
	mentorId: string;
	duration: number;
	price: number;
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

	static create(props: CreateSessionProps) {
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
	get price() {
		return this.props.price;
	}

	delete() {
		this.props.deletedAt = new Date();
	}
	update(
		updatedProps: Partial<
			Omit<
				ISessionProps,
				"id" | "mentorId" | "createdAt" | "updatedAt" | "deletedAt"
			>
		>,
	) {
		if (updatedProps.name !== undefined) {
			this.props.name = updatedProps.name;
		}

		if (updatedProps.duration !== undefined) {
			this.props.duration = updatedProps.duration;
		}

		if (updatedProps.price !== undefined) {
			this.props.price = updatedProps.price;
		}

		if (updatedProps.description !== undefined) {
			this.props.description = updatedProps.description;
		}

		if (updatedProps.isActive !== undefined) {
			this.props.isActive = updatedProps.isActive;
		}

		this.props.updatedAt = new Date();
	}

	activate() {
		this.props.isActive = true;
	}

	deactivate() {
		this.props.isActive = false;
	}
}
