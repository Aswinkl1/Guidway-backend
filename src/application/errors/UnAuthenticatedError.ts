import { DomainError } from "@domain/errors/DomainError.abstract";
import { DomainErrorCode } from "@domain/errors/DomainErrorCode";

export class UnAuthenticatedError extends DomainError {
	serialize(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}

	constructor(message: string) {
		super(DomainErrorCode.UNAUTHORIZED, message);
	}
}
