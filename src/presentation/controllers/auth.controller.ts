import { loginSignupSchema } from "@application/dto/user/loginUser.dto";
import { signupUserSchema } from "@application/dto/user/signupUser.dto";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AuthController {
  constructor(
    private readonly signUpUsecase: ISignUpUsecase,
    private readonly _verifyEmailUsecase: IVerifyEmailUsecase,
    private readonly _loginUsecase: ILoginUsecase,
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

    const rec = await this._loginUsecase.execute(parsed.data);
    console.log("jd");
    res.status(200).json({ status: "success", rec });
    // } catch (error) {
    // next(error);
    // }
  };
}
