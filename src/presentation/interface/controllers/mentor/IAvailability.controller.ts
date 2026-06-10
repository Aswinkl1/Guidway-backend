import type { Request, Response } from "express";

export interface IAvailabilityController {
	addAvalilability(req: Request, res: Response): Promise<void>;
	getAllAvailability(req: Request, res: Response): Promise<void>;
	deleteAvailablity(req: Request, res: Response): Promise<void>;
	toggleAvailability(req: Request, res: Response): Promise<void>;
	getSlotsByDate(req: Request, res: Response): Promise<void>;
}
