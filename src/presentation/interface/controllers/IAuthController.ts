import { type Request, type Response } from 'express';

export interface IAuthController {
  userSignUp(req: Request, res: Response): Promise<void>;
  verifyUser(req: Request, res: Response): Promise<void>;
  userLogin(req: Request, res: Response): Promise<void>;
  mock(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
  refreshToken(req: Request, res: Response): Promise<void>;
  adminLogin(req: Request, res: Response): Promise<void>;
}
