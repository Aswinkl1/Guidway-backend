import type { JWTTokenPaylod } from "@application/types/JWTTokenPayload.type";

declare global {
	namespace Express {
		interface User extends JWTTokenPaylod {}
		interface Request {
			// user?: JWTTokenPaylod;
			validated?: {
				query?: Record<string, unknown>;
				body?: Record<string, unknown>;
				params?: Record<string, unknown>;
			};
			OAuthUser?: {
				refreshToken: string;
			};
		}
	}
}
