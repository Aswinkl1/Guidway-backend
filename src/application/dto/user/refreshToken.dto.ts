import z from "zod";

export const refreshTokenSchema = z.string().nonempty();

type RefreshToken = z.infer<typeof refreshTokenSchema>;
