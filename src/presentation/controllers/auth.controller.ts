import { signupUserSchema } from "@application/dto/user/signupUser.dto";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { Request, Response } from "express";
import { ZodError } from "zod";

export class AuthController {
  constructor(private signUpUsecase: ISignUpUsecase) {}

  userSignUp = async (req: Request, res: Response) => {
    try {
      console.log("controller");
      const parsed = signupUserSchema.safeParse(req.body);
      if(!parsed.success){

      }
      const rec = await this.signUpUsecase.execute(parsed);

      console.log(rec);

      res.status(200).json({ message: "success", rec });
    } catch (error: any) {
      console.log(error);
      res.send(error.ZodError);
    }
  };
}
