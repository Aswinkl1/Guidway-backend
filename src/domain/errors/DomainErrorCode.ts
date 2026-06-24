export const DomainErrorCode = {
	NOT_FOUND: "NOT_FOUND",
	ALREADY_EXISTS: "ALREADY_EXISTS",
	BAD_REQUEST: "BAD_REQUEST",
	UNAUTHORIZED: "UNAUTHORIZED",
	FORBIDDEN: "FORBIDDEN",
	CONFLICT: "CONFLICT",
} as const;

// This extracts the values into a strict TypeScript type
export type DomainErrorCode =
	(typeof DomainErrorCode)[keyof typeof DomainErrorCode];
