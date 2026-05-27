import type { Request, Response } from "express";

export interface IUserController {
	getListMentors(req: Request, res: Response): Promise<void>;
	getMentorProfile(req: Request, res: Response): Promise<void>;
}
