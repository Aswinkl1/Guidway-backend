import { type Request, type Response } from 'express';

export interface IUserManagementController {
  getAllUsers: (req: Request, res: Response) => Promise<void>;
}
