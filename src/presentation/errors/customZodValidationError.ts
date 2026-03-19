import { AppError } from '@application/errors/AppError.abstract';
import { AppErrorCode } from '@application/errors/AppErrorCode';
import { type ZodError } from 'zod';

export class CustomZodValidationError extends AppError {
  serialize(): { message: string; field?: string }[] {
    const error = this.zodErrors.issues.map((err) => {
      return { field: err.path.join(''), message: err.message };
    });

    return error;
  }
  constructor(
    private readonly zodErrors: ZodError,
    message?: string,
  ) {
    super(AppErrorCode.BAD_REQUEST, message ?? 'zod error');
    Object.setPrototypeOf(this, CustomZodValidationError.prototype);
  }
}
