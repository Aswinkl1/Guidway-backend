import { AppError } from './AppError.abstract';
import { AppErrorCode } from './AppErrorCode';

export class ForbiddenError extends AppError {
  serialize(): { message: string; field?: string }[] {
    return [{ message: this.message }];
  }
  constructor(message = 'You do not have permission to perform this action') {
    super(AppErrorCode.FORBIDDEN, message);
  }
}
