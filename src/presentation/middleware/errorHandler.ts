import { AppError } from '@application/errors/AppError.abstract';
import { AppErrorCode } from '@application/errors/AppErrorCode';
import { DomainError } from '@domain/errors/DomainError.abstract';
import { DomainErrorCode } from '@domain/errors/DomainErrorCode';
import { createError } from '@presentation/helper/response.util';
import { type NextFunction, type Request, type Response } from 'express';
type ErrorCode = DomainErrorCode | AppErrorCode;
const errorCodeToHttpStatusMap: Record<ErrorCode, number> = {
  [DomainErrorCode.BAD_REQUEST]: 400,
  [DomainErrorCode.UNAUTHORIZED]: 401,
  [DomainErrorCode.FORBIDDEN]: 403,
  [DomainErrorCode.NOT_FOUND]: 404,
  [DomainErrorCode.ALREADY_EXISTS]: 409,
  [AppErrorCode.INVALID_CREDENTIALS]: 400,
};
export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  if (err instanceof DomainError || err instanceof AppError) {
    const statusCode = errorCodeToHttpStatusMap[err.code] || 400;

    res.status(statusCode).json(createError(err.message, err.serialize()));
    return;
  }

  console.error('🔥 UNEXPECTED SYSTEM ERROR:', err);

  res
    .status(500)
    .json(
      createError('Something went wrong on our end. Please try again later.', [
        { message: err.message },
      ]),
    );
};
