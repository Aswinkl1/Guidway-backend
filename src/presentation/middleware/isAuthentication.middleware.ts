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
  // TODO : check that if this user id is in redis if it does then restrict the user
  //constext : if the admin blocks the user the user still has access
  // to his acesstoken to we store the id of the users who are blocked by the admin in the redis
  // if the id is found on the redis then restrict the user
  //
  console.log(payload);
  if (!payload) {
    throw new Error("user not Authenticated");
  }

  if (
    payload.role == "admin" ||
    payload.role == "mentee" ||
    payload.role == "mentor"
  ) {
    req.user = payload;
    return next();
  }

  throw new Error("user not Authenticated");
};
export { isAuthenticate };
