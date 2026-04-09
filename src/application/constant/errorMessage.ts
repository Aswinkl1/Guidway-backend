export const APP_ERRORS_MESSAGES = {
	USER: {
		NOT_FOUND: "user not found",
		INVALID_CREDENTIALS: "Invalid email or password",
		GOOGLE_AUTH_REQUIRED:
			"This account was created using Google. Please sign in with Google",
		BLOCKED_BY_ADMIN: "user blocked by the admin",
	},
	TOKEN: {
		INVALID_OR_EXPIRED: "invalid or expired token",
	},
	FILE: {
		UNSUPPORTED_TYPE: "Unsupported file type",
	},
} as const;
