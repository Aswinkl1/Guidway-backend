import type {
	CreateOrderConfig,
	CreateOrderResponse,
} from "@application/types/PaymentService.types";

export interface IPaymentService {
	getPaymentProviderName(): string;
	createOrder(config: CreateOrderConfig): Promise<CreateOrderResponse>;
}
