import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ZodSchema } from "zod/v3";

type RequestSource = "body" | "query" | "params";
const validatetor = (schema: ZodType, source: RequestSource) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      throw new CustomZodValidationError(parsed.error);
    }
    req[source] = parsed.data;
    next();
  };
};

export default validatetor;
