import type { getUsersDTO } from "@application/dto/admin/GetUsers.dto";
import type { updateBlockStatusDto } from "@application/dto/admin/UpdateBlockStatus.dto";
import type { VerifyMentorDto } from "@application/dto/admin/VerifyMentor.dto";
import type { MentorStatusUpdateDTO } from "@application/dto/mentor/MentorStatusUpdate.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IGetUsersUsecase } from "@application/ports/usecase/admin/IGetUsers.usecase";
import type { IUpdateBlockStatus } from "@application/ports/usecase/admin/IUpdateBlockStatus";
import type IVerifyMentorUsecase from "@application/ports/usecase/admin/IVerifyMentor.usecase";
import type { IGetMentorProfileUsecase } from "@application/ports/usecase/mentor/IGetMentorProfile.usecase";
import type { IMentorStatusUpdateUsecase } from "@application/ports/usecase/mentor/IMentorStatusUpdate.usecase";
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
		@inject(TYPES.VerifyMentorUsecase)
		private readonly _verifyMentorUsecase: IVerifyMentorUsecase,
		@inject(TYPES.GetMentorProfileUsecase)
		private readonly _getMentorProfileUsecase: IGetMentorProfileUsecase,
		@inject(TYPES.MentorStatusUpdateUsecase)
		private readonly _mentorStatusUpdateUsecase: IMentorStatusUpdateUsecase,
	) {}

	getAllUsers = async (req: Request, res: Response): Promise<void> => {
		const query = req.validated?.query as getUsersDTO;
		console.log("query", query);
		const { data: users, totalItems } =
			await this._getAllUsersUseCase.execute(query);
		console.log(users);
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
		console.log(data);
		await this._updateBlockStatusUsecase.execute(data);
		res
			.status(HTTPSTATUS.OK)
			.json(createSuccess("status changed successfully", {}));
	};

	updateVerifyMentor = async (req: Request, res: Response) => {
		const { userId } = req.body;
		console.log(userId);
		const parsed = req.validated?.body as VerifyMentorDto;
		await this._verifyMentorUsecase.execute(parsed.mentorId);
		console.log("its done");
		res
			.status(HTTPSTATUS.OK)
			.json(createSuccess("Mentor Verified successfully", {}));
	};

	getMentorDetail = async (req: Request, res: Response) => {
		const mentorId = req.params.id;

		if (!mentorId || typeof mentorId !== "string") {
			throw new NotFoundError("mentorid not foundS");
		}
		const profile = await this._getMentorProfileUsecase.execute(mentorId);
		res.status(HTTPSTATUS.OK).json(createSuccess("succesfull", profile));
	};

	updateMentorStatus = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as MentorStatusUpdateDTO;
		const mentorId = req.body.mentorId;

		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		await this._mentorStatusUpdateUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", {}));
	};
}
