import { Role } from "@domain/entities/user";
import z from "zod";

const optionalBoolean = z.preprocess(
  (val) => {
    if (val === undefined || val === null || val === "") return undefined;
    return val;
  },
  z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),
);
export const getUsersSchema = z.object({
  search: z.string().trim().optional().default(""),
  page: z.coerce.number().min(1).catch(1),
  limit: z.coerce.number().min(5).catch(5),
  isBlocked: optionalBoolean,
  isVerified: optionalBoolean,
  role: z.enum(["mentee", "mentor", "admin"]).optional(),
});

export type getUsersDTO = z.infer<typeof getUsersSchema>;

// This is what the find all function returns for the user
export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
}
