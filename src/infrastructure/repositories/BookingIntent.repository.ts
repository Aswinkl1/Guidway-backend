// import { IBookingIntentRepository } from "@application/ports/repository/IBookingIntent.repository";
// import { TYPES } from "@config/DI-container/TYPES";
// import { BookingIntent } from "@domain/booking/entities/bookingIntent.entity";
// import { PrismaClient } from "generated/prisma/client";
// import { inject } from "inversify";

// export class BookingIntent implements IBookingIntentRepository{

//   constructor(@inject(TYPES.)private readonly _prisma:PrismaClient){}
//   create(data: BookingIntent): Promise<BookingIntent> {
//     const record = await this._prisma.bookingIntent.create({data})
//   }
//   findBySlotId(slotId: string): Promise<BookingIntent | null> {
//     throw new Error("Method not implemented.");
//   }
//   save(slotId: string, data: Partial<BookingIntent>): Promise<BookingIntent> {
//     throw new Error("Method not implemented.");
//   }
//   findByGatewayOrderId(gatewayOrderId: string): Promise<BookingIntent | null> {
//     throw new Error("Method not implemented.");
//   }
//   deleteBySlotId(slotId: string): Promise<void> {
//     throw new Error("Method not implemented.");
//   }

//   toPersistence(data:BookingIntent):{
//     return {

//     }
//   }
// }
