import type { AppErrorCode } from "./AppErrorCode";

export abstract class AppError extends Error {
	constructor(
		public readonly code: AppErrorCode,
		message: string,
	) {
		super(message);

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
		Object.setPrototypeOf(this, new.target.prototype);
	}

	abstract serialize(): { message: string; field?: string }[];
}
