import type { IPaymentService } from "@application/ports/services/IPaymentService";
import { EnvConfig } from "@config/env";
import Razorpay from "razorpay";

export class PaymentService implements IPaymentService {
	private readonly razorpay: Razorpay;
	constructor() {
		this.razorpay = new Razorpay({
			key_id: EnvConfig.RAZORPAY_KEY_ID,
			key_secret: EnvConfig.RAZORPAY_KEY_SECRET,
		});
	}
	createOrder(amount: number, currency: string): Promise<{ orderId: string }> {
		throw new Error("Method not implemented.");
	}
}
