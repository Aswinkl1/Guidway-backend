import { AppError } from "./AppError.abstract";
import { AppErrorCode } from "./AppErrorCode";

export class InvalidCredentialsError extends AppError {
  serialize(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
  constructor(message: string) {
    super(AppErrorCode.INVALID_CREDENTIALS, message);
  }
}
