import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import { createSuccess } from "@presentation/helper/response.util";
import type { IUserManagementController } from "@presentation/interface/controllers/IUserManagement.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserManagementController implements IUserManagementController {
	constructor(
		@inject(TYPES.GetUserUsecase)
		private readonly _getAllUsersUseCase: IGetUsersUsecase,
	) {}

	getAllUsers = async (req: Request, res: Response): Promise<void> => {
		const query = req.validated?.query as getUsersDTO;
		console.log("query", query);
		const users = await this._getAllUsersUseCase.execute(query);
		res.status(200).json(createSuccess("users fetched successfully", users));
	};
}
