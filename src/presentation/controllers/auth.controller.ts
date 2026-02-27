import { signupUserSchema } from "@application/dto/user/signupUser.dto";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AuthController {
  constructor(private signUpUsecase: ISignUpUsecase) {}

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
}
