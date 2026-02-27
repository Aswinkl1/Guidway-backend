import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { IUserRepository } from "@application/ports/IUserRepository";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { UserAlreadyExistsError } from "@domain/errors/UserError";

export class SignUpUser implements ISignUpUsecase {
  constructor(private _userRepository: IUserRepository) {}

  execute = async (data: signupUserDTO) => {
    console.log(data);
    const exists = await this._userRepository.findByEmail(data.email);
    if (!exists) {
      throw new UserAlreadyExistsError(data.email);
    }
    console.log("before passing", data);
    const rec = await this._userRepository.create(data);
    console.log("Rec", rec);
    return {
      message: "account created succesfully",
      rec,
    };
  };
}
