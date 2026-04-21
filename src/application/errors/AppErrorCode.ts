export const AppErrorCode = {
	NOT_FOUND: "NOT_FOUND",
	ALREADY_EXISTS: "ALREADY_EXISTS",
	BAD_REQUEST: "BAD_REQUEST",
	UNAUTHORIZED: "UNAUTHORIZED",
	FORBIDDEN: "FORBIDDEN",
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
} as const;

// This extracts the values into a strict TypeScript type
export type AppErrorCode = (typeof AppErrorCode)[keyof typeof AppErrorCode];
