import { Request, Response, NextFunction } from "express";

export interface IUserManagementController {
  getAllUsers: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}
