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
  search: z.string().optional().default(""),
  page: z.coerce.number().min(1).catch(1),
  limit: z.coerce.number().min(5).catch(5),
  isBlocked: optionalBoolean,
  isVerified: optionalBoolean,
});

export type getUsersDTO = z.infer<typeof getUsersSchema>;
