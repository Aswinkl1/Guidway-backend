import { AppError } from '@application/errors/AppError.abstract';
import { DomainError } from '@domain/errors/DomainError.abstract';
import HTTPSTATUS from '@presentation/constants/httpStatus';
import { getHttpStatusForErrorCode } from '@presentation/constants/httpStatusForErrorCode';
import { createError } from '@presentation/helper/response.util';
import { type NextFunction, type Request, type Response } from 'express';

export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Promise<void> => {
  if (err instanceof DomainError || err instanceof AppError) {
    const statusCode = getHttpStatusForErrorCode(err.code);

    res.status(statusCode).json(createError(err.message, err.serialize()));
    return;
  }

  console.error('🔥 UNEXPECTED SYSTEM ERROR:', err);

  res
    .status(HTTPSTATUS.INTERNAL_SERVER_ERROR)
    .json(
      createError('Something went wrong on our end. Please try again later.', [
        { message: err.message },
      ]),
    );
};
