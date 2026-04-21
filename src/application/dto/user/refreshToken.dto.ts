import z from "zod";

export const refreshTokenSchema = z.string().nonempty();

export type RefreshToken = z.infer<typeof refreshTokenSchema>;
