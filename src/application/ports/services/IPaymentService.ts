export interface IPaymentService {
	createOrder(amount: number, currency: string): Promise<{ orderId: string }>;
}
