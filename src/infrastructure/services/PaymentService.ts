import type { IPaymentService } from "@application/ports/services/IPaymentService";
import type {
	CreateOrderConfig,
	CreateOrderResponse,
} from "@application/types/PaymentService.types";
import { EnvConfig } from "@config/env";
import { injectable } from "inversify";
import Razorpay from "razorpay";

@injectable()
export class PaymentService implements IPaymentService {
	private readonly razorpay: Razorpay;
	constructor() {
		this.razorpay = new Razorpay({
			key_id: EnvConfig.RAZORPAY_KEY_ID,
			key_secret: EnvConfig.RAZORPAY_KEY_SECRET,
		});
	}

	getPaymentProviderName(): string {
		return "Razorpay";
	}
	async createOrder(
		config: CreateOrderConfig,
	): Promise<Omit<CreateOrderResponse, "slotId">> {
		try {
			const order = await this.razorpay.orders.create({
				amount: config.amount,
				currency: config.currency,
				notes: config.metaData,
			});
			return {
				orderId: order.id,
				amount_due: order.amount_due,
				currency: order.currency,
			};
		} catch (error) {
			console.log("Error creating order:", error);
			throw new Error("Failed to create order");
		}
	}
}
