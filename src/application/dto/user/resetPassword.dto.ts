import z from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string("Password is required.")
    .trim()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  token: z.string(),
});

export type resetPasswordDTO = z.infer<typeof resetPasswordSchema>;
