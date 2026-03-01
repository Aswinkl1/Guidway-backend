import { loginUserDTO } from "@application/dto/user/loginUser.dto";
import { IUserRepository } from "@application/ports/repository/IUserRepository";
import { IHashService } from "@application/ports/services/IHashService";
import { ILoginUsecase } from "@application/ports/usecase/ILogin.usecase";
import { User } from "@domain/entities/user";
import { UserNotFoundError } from "@domain/errors/UserError";

export class LoginUsecase implements ILoginUsecase {
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _hashService: IHashService,
  ) {}
  execute = async (dto: loginUserDTO): Promise<Partial<User>> => {
    // check if the email exists
    const user = await this._userRepository.findByEmail(dto.email);

    // if not usernot found error
    if (!user) {
      throw new UserNotFoundError(dto.email);
    }

    if (user.password == null) {
      throw new Error("user uses goodgle auth");
    }

    // check if the password matches
    const isMatch = await this._hashService.compare(
      dto.password,
      user.password,
    );
    // if not password doest match
    if (!isMatch) {
      throw new Error("password doesn't match ");
    }
    // if everthing is okey send response
    return user;
  };
}
