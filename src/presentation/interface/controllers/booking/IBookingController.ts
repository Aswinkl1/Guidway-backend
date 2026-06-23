import type { Request, Response } from "express";

export interface IBookingController {
	createBookingIntent(req: Request, res: Response): Promise<void>;
}
