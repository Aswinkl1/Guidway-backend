import type { Request, Response } from "express";

export interface IProfileController {
	addEducation(req: Request, res: Response): Promise<void>;
	updateEducation(req: Request, res: Response): Promise<void>;
}
