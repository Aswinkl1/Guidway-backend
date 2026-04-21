import { DomainError } from "./DomainError.abstract";
import { DomainErrorCode } from "./DomainErrorCode";

export class UserAlreadyExistsError extends DomainError {
	serialize(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}
	constructor(email: string) {
		super(
			DomainErrorCode.ALREADY_EXISTS,
			`A user with email "${email}" already exists.`,
		);
	}
}

export class UserNotFoundError extends DomainError {
	serialize(): { message: string; field?: string }[] {
		return [{ message: this.message }];
	}
	constructor(_email: string) {
		super(DomainErrorCode.NOT_FOUND, "User not found");
	}
}
