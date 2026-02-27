import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { IUserRepository } from "@application/ports/IUserRepository";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";

export class SignUpUser implements ISignUpUsecase {
  constructor(private _userRepository: IUserRepository) {}

  execute = async (data: signupUserDTO) => {
    console.log("hfi");
    const rec = await this._userRepository.create(data);
    console.log("Rec", rec);
    return {
      message: "account created succesfully",
      rec,
    };
  };
}
