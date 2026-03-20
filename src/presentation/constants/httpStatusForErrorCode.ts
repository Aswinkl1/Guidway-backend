import { AppErrorCode } from "@application/errors/AppErrorCode";
import { DomainErrorCode } from "@domain/errors/DomainErrorCode";
import HTTPSTATUS, { type HTTPSTATUSTYPE } from "./httpStatus";

type ErrorCode = DomainErrorCode | AppErrorCode;
const errorCodeToHttpStatusMap: Record<ErrorCode, HTTPSTATUSTYPE> = {
	[DomainErrorCode.BAD_REQUEST]: HTTPSTATUS.BAD_REQUEST,
	[DomainErrorCode.UNAUTHORIZED]: HTTPSTATUS.UNAUTHORIZED,
	[DomainErrorCode.FORBIDDEN]: HTTPSTATUS.FORBIDDEN,
	[DomainErrorCode.NOT_FOUND]: HTTPSTATUS.NOT_FOUND,
	[DomainErrorCode.ALREADY_EXISTS]: HTTPSTATUS.CONFLICT,
	[AppErrorCode.INVALID_CREDENTIALS]: HTTPSTATUS.BAD_REQUEST,
};

export const getHttpStatusForErrorCode = (code: ErrorCode): HTTPSTATUSTYPE => {
	return errorCodeToHttpStatusMap[code] || HTTPSTATUS.BAD_REQUEST;
};
