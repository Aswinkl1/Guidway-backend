import {
	CreateEducationSchema,
	DeleteEducationSchema,
	type EditEducationDTO,
} from "@application/dto/mentor/education.dto";
import type { CreateExperiencedto } from "@application/dto/mentor/experience.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IAddEducationUsecase } from "@application/ports/usecase/mentor/education/IAdd-Education.usecase";
import type { IDeleteEducationUsecase } from "@application/ports/usecase/mentor/education/IDelete-Education.usecase";
import type { IEditEducationUsecase } from "@application/ports/usecase/mentor/education/IEdit-Education.usecase";
import type { IAddExperienceUsecase } from "@application/ports/usecase/mentor/experience/IAdd-Experience.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
import { createSuccess } from "@presentation/helper/response.util";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class ProfileController {
	constructor(
		@inject(TYPES.AddEducationUsecase)
		private readonly _addEducationUsecae: IAddEducationUsecase,
		@inject(TYPES.EditEducationUsecase)
		private readonly _editEducationUsecase: IEditEducationUsecase,
		@inject(TYPES.DeleteEducationUsecase)
		private readonly _deleteEducationUsecase: IDeleteEducationUsecase,
		@inject(TYPES.AddExperienceUsecase)
		private readonly __addExperienceUsecase: IAddExperienceUsecase,
	) {}

	addEducation = async (req: Request, res: Response) => {
		const parsed = CreateEducationSchema.safeParse(req.body);
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}
		const mentorId = req?.user?.mentorId;
		console.log(req.headers.authorization);
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}
		const educationRecord = await this._addEducationUsecae.execute(
			mentorId,
			parsed.data,
		);
		res
			.status(HTTPSTATUS.CREATED)
			.json(createSuccess("education created succesfull", educationRecord));
	};

	updateEducation = async (req: Request, res: Response) => {
		const parsed = req.validated?.body as EditEducationDTO;
		const mentorId = req?.user?.mentorId;
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		const record = await this._editEducationUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.OK)
			.json(createSuccess("Education edit succesfull", record));
	};

	deleteEducation = async (req: Request, res: Response) => {
		const mentorId = req.user?.mentorId;
		const educationId = req.params.id;

		const parsed = DeleteEducationSchema.safeParse({
			mentorId,
			id: educationId,
		});
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}

		await this._deleteEducationUsecase.execute(parsed.data);

		res
			.status(HTTPSTATUS.NO_CONTENT)
			.json(createSuccess("Education succesfull deleted ", {}));
	};

	addExperience = async (req: Request, res: Response) => {
		const mentorId = req.user?.mentorId;
		const parsed = req.validated?.body as CreateExperiencedto;

		if (!mentorId) {
			throw new NotFoundError("mentorID not found");
		}
		const data = await this.__addExperienceUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.CREATED)
			.json(createSuccess("Experience created succesfull", data));
	};
}
