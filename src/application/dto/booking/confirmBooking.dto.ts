import { z } from "zod";

export const verifyPaymentSchema = z.object({
	provider: z.literal("RAZORPAY"),
	gatewayOrderId: z.string().min(14),
	gatewayPaymentId: z.string().min(14),
	gatewaySignature: z.string().length(64),
});

export type VerifyPaymentDto = z.infer<typeof verifyPaymentSchema>;
