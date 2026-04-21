import type { Role } from "@domain/user/user";
import z from "zod";

export const loginInputSchema = z.object({
	email: z.email("Please enter a valid email address."),
	password: z
		.string("Password is required.")
		.trim()
		.min(8, "Password must be at least 8 characters.")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter.")
		.regex(/[0-9]/, "Password must contain at least one number."),
});

export type loginUserInputDTO = z.infer<typeof loginInputSchema>;

// export interface AuthUserDTO {
//   id: number;
//   name: string;
//   email: string;
//   role: 'mentor' | 'mentee' | 'admin';
// }

export interface loginOutputDTO {
	role: Role;
	accessToken: string;
	refreshToken: string;
}
