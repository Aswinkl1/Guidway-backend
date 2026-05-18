import type { Request, Response } from "express";

export interface IUserManagementController {
	getAllUsers: (req: Request, res: Response) => Promise<void>;
	updateBlockStatus: (req: Request, res: Response) => Promise<void>;
	updateVerifyMentor: (req: Request, res: Response) => Promise<void>;
	getMentorDetail: (req: Request, res: Response) => Promise<void>;
	updateMentorStatus: (req: Request, res: Response) => Promise<void>;
}
