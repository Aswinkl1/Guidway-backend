import type { Role } from "@domain/entities/user";
import type { NextFunction, Request, Response } from "express";

export const authorizedRoles = (...roles: Role[]) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		if (!req?.user?.role) {
			throw new Error("user is not Authenticated");
		}

		if (!roles.includes(req.user.role)) {
			throw new Error("user is not autherized");
		}

		next();
	};
};
