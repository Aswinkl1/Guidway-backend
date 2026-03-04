import { forgetPasswordSchema } from "@application/dto/user/forgetPassword.dto";
import { loginSignupSchema } from "@application/dto/user/loginUser.dto";
import { signupUserSchema } from "@application/dto/user/signupUser.dto";
import { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { success, ZodError } from "zod";

export class AuthController {
  constructor(
    private readonly signUpUsecase: ISignUpUsecase,
    private readonly _verifyEmailUsecase: IVerifyEmailUsecase,
    private readonly _loginUsecase: ILoginUsecase,
    private readonly _forgetPasswordUsecase: IForgetPasswordUsecase,
  ) {}

  userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const parsed = signupUserSchema.safeParse(req.body);
      if (!parsed.success) {
        console.log("not success");
        return;
      }
      console.log("parced", parsed);
      const rec = await this.signUpUsecase.execute(parsed.data);

      console.log(rec);

      res.status(200).json({ message: "success", rec });
    } catch (error: any) {
      next(error);
    }
  };

  verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the token from the query
      const token = String(req.query.token);

      // if no token then sedn the error
      if (token == undefined) {
        throw new Error("token is not found");
      }

      // send the token to the verify usecase
      const user = await this._verifyEmailUsecase.execute(token);
      // send the responce back

      res.status(200).json({ message: "email verifyed succesfull", user });
    } catch (error) {
      next(error);
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const parsed = loginSignupSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("error");
      return;
    }
    console.log("parsed", parsed);

    const { user, accessToken, refreshToken } =
      await this._loginUsecase.execute(parsed.data);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });
    res.status(200).json({ status: "success", data: { user, accessToken } });
    // } catch (error) {
    // next(error);
    // }
  };

  mock = async (req: Request, res: Response) => {
    console.log(req.cookies);
    res.send("heleleleo");
  };

  forgetPassword = async (req: Request, res: Response) => {
    console.log(req.body);
    const parsed = forgetPasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      console.log("zod error");
      throw new Error("email is not provided");
    }
    console.log(parsed.data);
    const { email } = await this._forgetPasswordUsecase.execute(parsed.data);

    res.status(200).json({ success: "true", email });
  };
}
