import type { Role } from "@domain/user/user";

export interface JWTTokenPaylod {
	userId: string;
	role: Role;
}
