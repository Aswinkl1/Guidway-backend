import { z } from "zod";

const passwordField = z
	.string("Password is required.")
	.trim()
	.min(8, "Password must be at least 8 characters.")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter.")
	.regex(/[0-9]/, "Password must contain at least one number.");

export const ChangePasswordSchema = z
	.object({
		oldPassword: passwordField,
		newPassword: passwordField,
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: "New password must be different from the old password.",
		path: ["newPassword"],
	});

export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;
