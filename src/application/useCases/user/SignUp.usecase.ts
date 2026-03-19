import { signupUserDTO } from '@application/dto/user/signupUser.dto';
import { ITokenCache } from '@application/ports/cache/ITokenCache';
import { IUserRepository } from '@application/ports/repository/IUserRepository';
import { IEmailService } from '@application/ports/services/IEmailService';
import { IHashService } from '@application/ports/services/IHashService';
import { ITokenService } from '@application/ports/services/ITokenService';
import { ISignUpUsecase } from '@application/ports/usecase/ISignUpUsecase';
import { TYPES } from '@config/DI-container/TYPES';
import { UserAlreadyExistsError } from '@domain/errors/UserError';
import { inject, injectable } from 'inversify';
injectable();
export class SignUpUser implements ISignUpUsecase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.HashService) private _hashService: IHashService,
    @inject(TYPES.TokenService) private _tokenService: ITokenService,
    @inject(TYPES.TokenRepository) private _tokenRepository: ITokenCache,
    @inject(TYPES.EmailService) private _emailService: IEmailService,
  ) {}

  execute = async (data: signupUserDTO): Promise<void> => {
    const exists = await this._userRepository.findByEmail(data.email);
    if (exists) {
      throw new UserAlreadyExistsError(data.email);
    }

    data.password = await this._hashService.hash(data.password);
    const savedUser = await this._userRepository.create(data);

    const verificationToken = this._tokenService.getVerifyToken(savedUser.id);

    await this._tokenRepository.saveToken(verificationToken, savedUser.id, 86400);

    await this._emailService.sendVerificationEmail(savedUser.email, verificationToken);
  };
}
