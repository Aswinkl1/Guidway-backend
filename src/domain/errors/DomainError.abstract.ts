import type { DomainErrorCode } from "./DomainErrorCode";

export abstract class DomainError extends Error {
	constructor(
		public readonly code: DomainErrorCode,
		message: string,
	) {
		super(message);
		this.code = code;
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
		Object.setPrototypeOf(this, new.target.prototype);
	}

	abstract serialize(): { message: string; field?: string }[];
}
