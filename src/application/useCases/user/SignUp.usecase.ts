import type { signupUserDTO } from "@application/dto/user/signupUser.dto";
import type { ITokenCache } from "@application/ports/cache/ITokenCache";
import type { IMentorRepository } from "@application/ports/repository/IMentorRepository";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IEmailService } from "@application/ports/services/IEmailService";
import type { IHashService } from "@application/ports/services/IHashService";
import type { ITokenService } from "@application/ports/services/ITokenService";
import type { ISignUpUsecase } from "@application/ports/usecase/ISignUpUsecase";
import { TYPES } from "@config/DI-container/TYPES";
import { UserAlreadyExistsError } from "@domain/errors/UserError";
import { Mentor } from "@domain/mentor/mentor.entity";
import { Role, User } from "@domain/user/user";
import { inject, injectable } from "inversify";

injectable();
export class SignUpUser implements ISignUpUsecase {
	constructor(
		@inject(TYPES.UserRepository) private _userRepository: IUserRepository,
		@inject(TYPES.HashService) private _hashService: IHashService,
		@inject(TYPES.TokenService) private _tokenService: ITokenService,
		@inject(TYPES.TokenRepository) private _tokenRepository: ITokenCache,
		@inject(TYPES.EmailService) private _emailService: IEmailService,
		@inject(TYPES.MentorRepository)
		private _mentorRepository: IMentorRepository,
	) {}

	execute = async (data: signupUserDTO): Promise<void> => {
		const exists = await this._userRepository.findByEmail(data.email);
		if (exists) {
			throw new UserAlreadyExistsError(data.email);
		}

		data.password = await this._hashService.hash(data.password);
		const user = new User(data);
		const savedUser = await this._userRepository.create(user);

		// if it is mentor create a row in the mentor table
		if (savedUser.role === Role.MENTOR) {
			const mentor = Mentor.create({ userId: savedUser.id });
			await this._mentorRepository.create(mentor);
		}

		const verificationToken = this._tokenService.getVerifyToken(savedUser.id);

		await this._tokenRepository.saveToken(
			verificationToken,
			savedUser.id,
			86400,
		);

		await this._emailService.sendVerificationEmail(
			savedUser.email,
			verificationToken,
		);
	};
}
