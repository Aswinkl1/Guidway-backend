import { JWTTokenPaylod } from "@application/types/JWTTokenPayload.type";

declare global {
  namespace Express {
    interface Request {
      user?: JWTTokenPaylod; // or any other type you want to attach
      validated?: {
        query?: Record<string, unknown>;
        body?: Record<string, unknown>;
        params?: Record<string, unknown>;
      };
    }
  }
}
