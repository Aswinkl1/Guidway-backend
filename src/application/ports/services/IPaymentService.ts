import type {
	CreateOrderConfig,
	CreateOrderResponse,
} from "@application/types/PaymentService.types";

export interface IPaymentService {
	createOrder(config: CreateOrderConfig): Promise<CreateOrderResponse>;
}
