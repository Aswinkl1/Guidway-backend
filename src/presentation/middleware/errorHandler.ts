import { AppError } from "@application/errors/AppError.abstract";
import { AppErrorCode } from "@application/errors/AppErrorCode";
import { DomainError } from "@domain/errors/DomainError.abstract";
import { DomainErrorCode } from "@domain/errors/DomainErrorCode";
import { createError } from "@presentation/helper/response.util";
import { NextFunction, Request, Response } from "express";
type ErrorCode = DomainErrorCode | AppErrorCode;
const errorCodeToHttpStatusMap: Record<ErrorCode, number> = {
  [DomainErrorCode.BAD_REQUEST]: 400,
  [DomainErrorCode.UNAUTHORIZED]: 401,
  [DomainErrorCode.FORBIDDEN]: 403,
  [DomainErrorCode.NOT_FOUND]: 404,
  [DomainErrorCode.ALREADY_EXISTS]: 409,
  [AppErrorCode.INVALID_CREDENTIALS]: 401,
};
export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof DomainError || err instanceof AppError) {
    const statusCode = errorCodeToHttpStatusMap[err.code] || 400;

    return res
      .status(statusCode)
      .json(createError(err.message, err.serialize()));
  }

  console.error("🔥 UNEXPECTED SYSTEM ERROR:", err);

  return res
    .status(500)
    .json(
      createError("Something went wrong on our end. Please try again later.", [
        { message: err.message },
      ]),
    );
};
