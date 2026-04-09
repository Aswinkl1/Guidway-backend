import { APP_ERRORS_MESSAGES } from "@application/constant/errorMessage";
import type { updateBlockStatusDto } from "@application/dto/admin/UpdateBlockStatus.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IUserRepository } from "@application/ports/repository/IUserRepository";
import type { IUpdateBlockStatus } from "@application/ports/usecase/admin/IUpdateBlockStatus";
import { TYPES } from "@config/DI-container/TYPES";
import { inject, injectable } from "inversify";

@injectable()
export class UpdateBlockStatus implements IUpdateBlockStatus {
	constructor(
		@inject(TYPES.UserRepository) private readonly _userRepo: IUserRepository,
	) {}
	async execute(dto: updateBlockStatusDto): Promise<void> {
		// check if the user existes
		const user = await this._userRepo.findById(dto.userId);
		// if not error
		if (!user) {
			throw new NotFoundError(APP_ERRORS_MESSAGES.USER.NOT_FOUND);
		}
		// change the thing in the domin

		if (dto.newBlockStatus) {
			user.block();
		} else {
			user.unBlock();
		}
		// save it
		this._userRepo.update(user.id, { isBlocked: user.isBlocked });
	}
}
