import type { ITokenService } from "@application/ports/services/ITokenService";
import { container } from "@config/DI-container/container";
import { TYPES } from "@config/DI-container/TYPES";
import { Role } from "@domain/user/user";
import type { NextFunction, Request, Response } from "express";

const tokenService = container.get<ITokenService>(TYPES.TokenService);
const isAuthenticate = (
	req: Request,
	_res: Response,
	next: NextFunction,
): void => {
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
	console.log("payload", payload.role);
	if (
		payload.role === Role.ADMIN ||
		payload.role === Role.MENTEE ||
		payload.role === Role.MENTOR
	) {
		req.user = payload;
		next();
		return;
	}

	throw new Error("user not Authenticated");
};

export { isAuthenticate };
