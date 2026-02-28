import { signupUserDTO } from "@application/dto/user/signupUser.dto";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { UserAlreadyExistsError } from "@domain/errors/UserError";

export class SignUpUser implements ISignUpUsecase {
  constructor(
    private _userRepository: IUserRepository,
    private _hashService: IHashService,
  ) {}

  execute = async (data: signupUserDTO) => {
    const exists = await this._userRepository.findByEmail(data.email);
    if (exists) {
      throw new UserAlreadyExistsError(data.email);
    }

    data.password = await this._hashService.hash(data.password);
    const rec = await this._userRepository.create(data);
    return {
      message: "account created succesfully",
      rec,
    };
  };
}
