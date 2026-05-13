import type { Request, Response } from "express";

export interface ISessionController {
	addSession(req: Request, res: Response): Promise<void>;
	editSession(req: Request, res: Response): Promise<void>;
}
