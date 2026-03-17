import { forgetPasswordSchema } from "@application/dto/user/forgetPassword.dto";
import { loginSchema, loginUserDTO } from "@application/dto/user/loginUser.dto";
import { refreshTokenSchema } from "@application/dto/user/refreshToken.dto";
import { resetPasswordSchema } from "@application/dto/user/resetPassword.dto";
import { signupUserSchema } from "@application/dto/user/signupUser.dto";
import { IAdminLoginUsecase } from "@application/ports/usecase/admin/IAdminLogin.usecase";
import { IForgetPasswordUsecase } from "@application/ports/usecase/IForgetPassword.usercase";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { IRefreshTokenUsecase } from "@application/ports/usecase/IRefreshToken.usecase";
import { IResetPassswordUsecase } from "@application/ports/usecase/IResetPassword.usecase";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { IVerifyEmailUsecase } from "@application/ports/usecase/IVerifyEmail.usecase";

import { TYPES } from "@config/DI-container/TYPES";
import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
import { createSuccess } from "@presentation/helper/response.util";
import { IAuthController } from "@presentation/interface/controllers/IAuthController";
import { NextFunction, Request, response, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject(TYPES.SignUpUseCase) private readonly signUpUsecase: ISignUpUsecase,
    @inject(TYPES.VerifyEmailUseCase)
    private readonly _verifyEmailUsecase: IVerifyEmailUsecase,
    @inject(TYPES.LoginUseCase) private readonly _loginUsecase: ILoginUsecase,
    @inject(TYPES.ForgetPasswordUseCase)
    private readonly _forgetPasswordUsecase: IForgetPasswordUsecase,
    @inject(TYPES.ResetPasswordUseCase)
    private readonly _resetPasswordUSecase: IResetPassswordUsecase,
    @inject(TYPES.RefreshTokenUseCase)
    private readonly _refreshTokenUsecase: IRefreshTokenUsecase,
    @inject(TYPES.AdminLoginUseCase)
    private readonly _adminLoginUsecase: IAdminLoginUsecase,
  ) {}

  userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const parsed = signupUserSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new CustomZodValidationError(parsed.error);
      }
      console.log("parced", parsed);
      const rec = await this.signUpUsecase.execute(parsed.data);

      const response = createSuccess("signup succesfull", rec);

      res.status(200).json(response);
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

      res
        .status(200)
        .json(createSuccess("email verification succesfull", user));
    } catch (error) {
      next(error);
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.validated?.body as loginUserDTO;
    const { role, accessToken, refreshToken } =
      await this._loginUsecase.execute(data);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });
    res
      .status(200)
      .json(createSuccess("login succesfull", { role, accessToken }));
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
      throw new CustomZodValidationError(parsed.error);
    }
    console.log(parsed.data);
    const { email } = await this._forgetPasswordUsecase.execute(parsed.data);

    res.status(200).json(createSuccess("check you email", email));
  };

  resetPassword = async (req: Request, res: Response) => {
    // verify the req body {token,password}
    const parsed = resetPasswordSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new CustomZodValidationError(parsed.error);
    }
    // give this data to the reset usecase
    await this._resetPasswordUSecase.execute(parsed.data);
    // return a response
    res.status(200).json(createSuccess("password changed succesfull", ""));
  };

  refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies["refreshToken"];

    const { accessToken, role } =
      await this._refreshTokenUsecase.execute(token);

    res
      .status(200)
      .json(createSuccess("req successfull", { role, accessToken }));
  };

  adminLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = req.validated?.body as loginUserDTO;
    const { role, accessToken, refreshToken } =
      await this._adminLoginUsecase.execute(data);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    });
    res
      .status(200)
      .json(createSuccess("admin login succesfull", { role, accessToken }));
  };
}
