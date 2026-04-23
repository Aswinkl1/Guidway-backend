import { CreateEducationSchema } from "@application/dto/mentor/education.dot";
import { NotFoundError } from "@application/errors/NotFoundError";
import type { IAddEducationUsecase } from "@application/ports/usecase/mentor/IAdd-Education.usecase";
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
}
