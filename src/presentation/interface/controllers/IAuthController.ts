import type { Request, Response } from "express";

export interface IAuthController {
  userSignUp(req: Request, res: Response): Promise<void>;
  verifyUser(req: Request, res: Response): Promise<void>;
  userLogin(req: Request, res: Response): Promise<void>;
  mock(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  resetPassword(req: Request, res: Response): Promise<void>;
  refreshToken(req: Request, res: Response): Promise<void>;
  adminLogin(req: Request, res: Response): Promise<void>;
  logout(req: Request, res: Response): Promise<void>;
  getSignedUrl(req: Request, res: Response): Promise<void>;
}
