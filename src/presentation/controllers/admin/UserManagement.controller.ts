import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { updateBlockStatusDto } from "@application/dto/admin/UpdateBlockStatus.dto";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import type { IUpdateBlockStatus } from "@application/ports/usecase/admin/IUpdateBlockStatus";
import { TYPES } from "@config/DI-container/TYPES";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { createSuccess } from "@presentation/helper/response.util";
import type { IUserManagementController } from "@presentation/interface/controllers/IUserManagement.controller";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class UserManagementController implements IUserManagementController {
  constructor(
    @inject(TYPES.GetUserUsecase)
    private readonly _getAllUsersUseCase: IGetUsersUsecase,
    @inject(TYPES.UpdateBlockStatus)
    private readonly _updateBlockStatusUsecase: IUpdateBlockStatus,
  ) {}

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const query = req.validated?.query as getUsersDTO;
    console.log("query", query);
    const { data: users, totalItems } =
      await this._getAllUsersUseCase.execute(query);
    const totalPages = Math.ceil(totalItems / query.limit);
    res.status(HTTPSTATUS.OK).json(
      createSuccess("users fetched successfully", {
        users,
        totalItems,
        totalPages,
        currentPage: query.page,
      }),
    );
  };

  updateBlockStatus = async (req: Request, res: Response) => {
    const data = req.validated?.body as updateBlockStatusDto;

    await this._updateBlockStatusUsecase.execute(data);
    res
      .status(HTTPSTATUS.OK)
      .json(createSuccess("status changed successfully", {}));
  };
}
