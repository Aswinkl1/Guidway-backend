import { DomainError } from "./DomainError.abstract";
import { DomainErrorCode } from "./DomainErrorCode";

export class ConflictError extends DomainError {
	serialize(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}

	constructor(message: string = "Resource already exists") {
		super(DomainErrorCode.CONFLICT, message);
	}
}
