import type { publicListMentorDto } from "@application/dto/mentor/listMentor.dto";
import type { IListMentorsUsecase } from "@application/ports/usecase/IListMentor.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IUserController } from "@presentation/interface/controllers/user/IUser.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class UserController implements IUserController {
	constructor(
		@inject(TYPES.ListMentorUsecase)
		private readonly _listMentorsUsecase: IListMentorsUsecase,
	) {}

	getListMentors = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as publicListMentorDto;

		const data = await this._listMentorsUsecase.execute(parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("success ", data));
	};
}
