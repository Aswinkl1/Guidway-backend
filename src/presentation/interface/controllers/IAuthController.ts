import { Request, Response, NextFunction } from "express";

export interface IAuthController {
  userSignUp(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  userLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
  mock(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
