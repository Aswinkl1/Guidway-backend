import type { Request, Response } from "express";

export interface IAdminBookingManagementController {
	getBookingDetails(req: Request, res: Response): Promise<void>;
}
