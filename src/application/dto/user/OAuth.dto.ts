import { Role } from "@domain/user/user";
import z from "zod";

export const OAuthSchema = z.object({
	email: z.email("Please enter a valid email address."),
	providerId: z.string("Provider ID is required."),
	name: z.string("Name is required.").trim().min(1, "Name cannot be empty."),
	role: z.enum(Role),
});

export type OAuthInputDTO = z.infer<typeof OAuthSchema>;

export interface OAuthOutputDTO {
	refreshToken: string;
}
