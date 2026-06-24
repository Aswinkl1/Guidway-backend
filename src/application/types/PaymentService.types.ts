export type CreateOrderConfig = {
	amount: number;
	currency: string;
	metaData?: Record<string, string>;
};

export type CreateOrderResponse = {
	orderId: string;
	amount_due: number;
	currency: string;
};
