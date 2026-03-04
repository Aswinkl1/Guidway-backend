import { JWTTokenPaylodRoleField } from "@application/types/JWTTokenPayload.type";
import { NextFunction, Response, Request } from "express";

export const authorizedRoles = (...roles: JWTTokenPaylodRoleField[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.user?.role) {
      throw new Error("user is not Authenticated");
    }

    if (!roles.includes(req.user.role)) {
      throw new Error("user is not autherized");
    }

    next();
  };
};
