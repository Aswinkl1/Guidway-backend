import { Request, Response, NextFunction } from "express";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { ITokenService } from "@application/ports/services/ITokenService";
const tokenService = container.get<ITokenService>(TYPES.TokenService);
const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error("user not autherized");
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  if (!token) {
    throw new Error("user not Authenticated");
  }

  const payload = tokenService.verifyAccessToken(token);
  console.log(payload);
  if (!payload) {
    throw new Error("user not Authenticated");
  }

  if (
    payload.role == "admin" ||
    payload.role == "student" ||
    payload.role == "mentor"
  ) {
    req.user = payload;
    return next();
  }

  throw new Error("user not Authenticated");
};
export { isAuthenticate };
