import type { Role } from "@domain/user/user";

export interface JWTTokenPaylod {
	id: string;
	role: Role;
}
