import type { Request, Response } from "express";

export interface IBookingController {
	createBookingIntent(req: Request, res: Response): Promise<void>;
	getBookingSetupDetails(req: Request, res: Response): Promise<void>;
	confirmBooking(req: Request, res: Response): Promise<void>;
	menteeBookingDetails(req: Request, res: Response): Promise<void>;
	getMentorBookingDetails(req: Request, res: Response): Promise<void>;
}
