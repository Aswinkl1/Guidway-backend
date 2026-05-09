import { v4 as uuid } from "uuid";

export interface IDomain {
	id: string;
	domainName: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateDomainProps
	extends Omit<IDomain, "id" | "createdAt" | "updatedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Domain {
	constructor(private props: IDomain) {}

	static create(props: CreateDomainProps): Domain {
		return new Domain({
			id: props.id ?? uuid(),
			domainName: props.domainName,
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		});
	}

	update(updatedProps: Partial<Omit<IDomain, "id" | "createdAt">>) {
		if (updatedProps.domainName !== undefined) {
			this.props.domainName = updatedProps.domainName;
		}

		if (updatedProps.updatedAt !== undefined) {
			this.props.updatedAt = updatedProps.updatedAt;
		} else {
			this.props.updatedAt = new Date();
		}
	}

	get id(): string {
		return this.props.id;
	}

	get domainName(): string {
		return this.props.domainName;
	}

	get createdAt(): Date {
		return this.props.createdAt;
	}

	get updatedAt(): Date {
		return this.props.updatedAt;
	}

	// toJSON(): IDomain {
	//   return {
	//     id: this.props.id,
	//     domainName: this.props.domainName,
	//     createdAt: this.props.createdAt,
	//     updatedAt: this.props.updatedAt,
	//   };
	// }
}
