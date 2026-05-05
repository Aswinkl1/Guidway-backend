import type { Request, Response } from "express";

export interface IProfileController {
	addEducation(req: Request, res: Response): Promise<void>;
	updateEducation(req: Request, res: Response): Promise<void>;
	deleteEducation(req: Request, res: Response): Promise<void>;
	addExperience(req: Request, res: Response): Promise<void>;
	editExperience(req: Request, res: Response): Promise<void>;
	deleteExperience(req: Request, res: Response): Promise<void>;
	addAchievement(req: Request, res: Response): Promise<void>;
}
