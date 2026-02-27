import { DomainError } from "@domain/errors/DomainError.abstract";
import { DomainErrorCode } from "@domain/errors/DomainErrorCode";
import { NextFunction, Request, Response } from "express";

const errorCodeToHttpStatusMap: Record<DomainErrorCode, number> = {
  [DomainErrorCode.BAD_REQUEST]: 400,
  [DomainErrorCode.UNAUTHORIZED]: 401,
  [DomainErrorCode.FORBIDDEN]: 403,
  [DomainErrorCode.NOT_FOUND]: 404,
  [DomainErrorCode.ALREADY_EXISTS]: 409,
};
export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof DomainError) {
    const statusCode = errorCodeToHttpStatusMap[err.code] || 400;

    return res.status(statusCode).json({ errors: err.serialize() });
  }

  console.error("🔥 UNEXPECTED SYSTEM ERROR:", err);

  return res.status(500).json({
    errors: [
      { message: "Something went wrong on our end. Please try again later." },
    ],
  });
};
