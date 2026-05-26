import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestSource = "body" | "query" | "params";
const validatetor = (schema: ZodType, source: RequestSource) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		const data = req[source];
		console.log(data);
		const parsed = schema.safeParse(data);
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}
		// req.validated[source] = parsed.data;
		req.validated = {
			body: parsed.data as Record<string, unknown>,
			query: parsed.data as Record<string, unknown>,
			params: parsed.data as Record<string, unknown>,
		};
		next();
	};
};

export default validatetor;
