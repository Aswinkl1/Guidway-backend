import type { Request, Response } from "express";

export interface ISettingsController {
	updateMentorBookingRules(req: Request, res: Response): Promise<void>;
	updateMentorStatus(req: Request, res: Response): Promise<void>;
	resetPassword(req: Request, res: Response): Promise<void>;
}
