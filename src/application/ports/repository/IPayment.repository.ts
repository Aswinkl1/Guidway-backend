import type { Payment } from "@domain/booking/entities/payment.entity";
import type { IBaseRepository } from "./IBaseRepository";

export interface IPaymentRepository
	extends IBaseRepository<Payment, Partial<Payment>, Partial<Payment>> {}
