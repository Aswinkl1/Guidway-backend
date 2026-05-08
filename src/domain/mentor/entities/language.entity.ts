import { v4 as uuid } from "uuid";

export interface ILanguage {
	id: string;
	name: string;
	code: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateLanguageProps
	extends Omit<ILanguage, "id" | "createdAt" | "updatedAt"> {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export class Language {
	private constructor(private props: ILanguage) {}

	static create(props: CreateLanguageProps) {
		if (!props.name || props.name.trim().length === 0) {
			throw new Error("Language name cannot be empty");
		}

		if (!props.code || props.code.trim().length === 0) {
			throw new Error("Language code cannot be empty");
		}

		const finalProps: ILanguage = {
			...props,
			code: props.code.toLowerCase(),
			id: props.id ?? uuid(),
			createdAt: props.createdAt ?? new Date(),
			updatedAt: props.updatedAt ?? new Date(),
		};

		return new Language(finalProps);
	}

	get id() {
		return this.props.id;
	}

	get name() {
		return this.props.name;
	}

	get code() {
		return this.props.code;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}
}
