import type { CreateAchievementDTO } from "@application/dto/mentor/acheivement.dto";
import type { GetDomainQueryDto } from "@application/dto/mentor/domain.dto";
import {
	CreateEducationSchema,
	DeleteEducationSchema,
	type EditEducationDTO,
} from "@application/dto/mentor/education.dto";
import {
	type CreateExperiencedto,
	DeleteExperienceSchema,
} from "@application/dto/mentor/experience.dto";
import type { GetLanguagesQueryDto } from "@application/dto/mentor/language.dto";
import {
	DeleteMentorLanguageSchema,
	type MentorLanguageDTO,
} from "@application/dto/mentor/mentorLanguage.dto";
import {
	DeleteMentorSkillSchema,
	type MentorSkillDTO,
} from "@application/dto/mentor/mentorSkill.dto";
import type { GetSkillsQueryDto } from "@application/dto/mentor/skill.dto";
import type { editProfileDTO } from "@application/dto/user/EditProfile.dto";
import { NotFoundError } from "@application/errors/NotFoundError";
import { UnAuthenticatedError } from "@application/errors/UnAuthenticatedError";
import type { IEditUserProfileUsecase } from "@application/ports/usecase/IEditUserProfile.usecase";
import type { IAddAchievementUsecase } from "@application/ports/usecase/mentor/achievements/IAdd-Achievement.usecase";
import type { IGetDomainUsecase } from "@application/ports/usecase/mentor/Domian/IGetDomain.usecase";
import type { IAddEducationUsecase } from "@application/ports/usecase/mentor/education/IAdd-Education.usecase";
import type { IDeleteEducationUsecase } from "@application/ports/usecase/mentor/education/IDelete-Education.usecase";
import type { IEditEducationUsecase } from "@application/ports/usecase/mentor/education/IEdit-Education.usecase";
import type { IAddExperienceUsecase } from "@application/ports/usecase/mentor/experience/IAdd-Experience.usecase";
import type { IDeleteExperienceUsecase } from "@application/ports/usecase/mentor/experience/IDelete-Experience.usecase";
import type { IEditExperienceUsecase } from "@application/ports/usecase/mentor/experience/IEdit-Experience.usecase";
import type { IGetMentorProfileUsecase } from "@application/ports/usecase/mentor/IGetMentorProfile.usecase";
import type { IAddMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IAddMentorLanguage.usecase";
import type { IDeleteMentorLanguageUsecase } from "@application/ports/usecase/mentor/language/IDeleteMentorLanguage.usecase";
import type { IGetLanguagesUsecase } from "@application/ports/usecase/mentor/language/IGetLanguage.usecase";
import type { IAddMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IAddMentorSkill.usecase";
import type { IDeleteMentorSkillUsecase } from "@application/ports/usecase/mentor/skills/IDeleteMentorSkill.usecase";
import type { IGetSkillsUsecase } from "@application/ports/usecase/mentor/skills/IGetSkills.usecase";
import { TYPES } from "@config/DI-container/TYPES";
import HTTPSTATUS from "@presentation/constants/httpStatus";
import { CustomZodValidationError } from "@presentation/errors/customZodValidationError";
import { createSuccess } from "@presentation/helper/response.util";
import type { IProfileController } from "@presentation/interface/controllers/IProfileController";
import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
@injectable()
export class ProfileController implements IProfileController {
	constructor(
		@inject(TYPES.AddEducationUsecase)
		private readonly _addEducationUsecae: IAddEducationUsecase,
		@inject(TYPES.EditEducationUsecase)
		private readonly _editEducationUsecase: IEditEducationUsecase,
		@inject(TYPES.DeleteEducationUsecase)
		private readonly _deleteEducationUsecase: IDeleteEducationUsecase,
		@inject(TYPES.AddExperienceUsecase)
		private readonly _addExperienceUsecase: IAddExperienceUsecase,
		@inject(TYPES.EditExperienceUsecase)
		private readonly _editExperienceUsecase: IEditExperienceUsecase,
		@inject(TYPES.DeleteExperienceUsecase)
		private readonly _deleteExperienceUsecase: IDeleteExperienceUsecase,
		@inject(TYPES.AddAchievementUsecase)
		private readonly _addAchievementUsecase: IAddAchievementUsecase,
		@inject(TYPES.GetSkillUsecase)
		private readonly _getSkillUsecase: IGetSkillsUsecase,
		@inject(TYPES.AddMentorSkillUsecase)
		private readonly _addMentorSkillUsecase: IAddMentorSkillUsecase,
		@inject(TYPES.DeleteMentorSkillUsecase)
		private readonly _deleteMentorSkillUsecase: IDeleteMentorSkillUsecase,
		@inject(TYPES.GetMentorProfileUsecase)
		private readonly _getMentorProfileUsecase: IGetMentorProfileUsecase,
		@inject(TYPES.AddMentorLanguageUsecase)
		private readonly _addMentorLanguageUsecase: IAddMentorLanguageUsecase,

		@inject(TYPES.DeleteMentorLanguageUsecase)
		private readonly _deleteMentorLanguageUsecase: IDeleteMentorLanguageUsecase,
		@inject(TYPES.GetLanguageUsecase)
		private readonly _getLanguageUsecase: IGetLanguagesUsecase,
		@inject(TYPES.EditUserProfileUsecase)
		private readonly _editUserProfileUsecase: IEditUserProfileUsecase,
		@inject(TYPES.GetDomainUsecase)
		private readonly _getDomainUsecase: IGetDomainUsecase,
	) {}

	addEducation = async (req: Request, res: Response) => {
		const parsed = CreateEducationSchema.safeParse(req.body);
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}
		const mentorId = req?.user?.userId;
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
		const mentorId = req?.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentor id not found");
		}

		const record = await this._editEducationUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.OK)
			.json(createSuccess("Education edit succesfull", record));
	};

	deleteEducation = async (req: Request, res: Response) => {
		const mentorId = req.user?.userId;
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
		const mentorId = req.user?.userId;
		const parsed = req.validated?.body as CreateExperiencedto;
		console.log("parced", parsed);
		if (!mentorId) {
			throw new NotFoundError("mentorID not found");
		}
		const data = await this._addExperienceUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.CREATED)
			.json(createSuccess("Experience created succesfull", data));
	};

	editExperience = async (req: Request, res: Response) => {
		const mentorId = req.user?.userId;
		const parsed = req.validated?.body as EditEducationDTO;
		console.log("parced", parsed);
		if (!mentorId) {
			throw new NotFoundError("mentorID not found");
		}
		const data = await this._editExperienceUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.OK)
			.json(createSuccess("Experience updated  succesfull", data));
	};

	deleteExperience = async (req: Request, res: Response) => {
		const mentorId = req.user?.userId;
		const experienceId = req.params.id;

		const parsed = DeleteExperienceSchema.safeParse({
			mentorId,
			id: experienceId,
		});
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}

		await this._deleteExperienceUsecase.execute(parsed.data);

		res
			.status(HTTPSTATUS.NO_CONTENT)
			.json(createSuccess("Education succesfull deleted ", {}));
	};

	addAchievement = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.body as CreateAchievementDTO;
		const mentorId = req.user?.userId;
		console.log("heheh");
		if (!mentorId) {
			throw new NotFoundError("mentor Id not foudnd");
		}

		const data = await this._addAchievementUsecase.execute(mentorId, parsed);

		res
			.status(HTTPSTATUS.CREATED)
			.json(createSuccess("Achievement created succesfull", data));
	};

	getAllSkills = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as GetSkillsQueryDto;

		const record = await this._getSkillUsecase.execute(parsed);
		console.log(record);
		res.status(HTTPSTATUS.OK).json(createSuccess("", record));
	};

	addOrUpdateMentorSkills = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const parsed = req.validated?.body as MentorSkillDTO;
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentorid not foundS");
		}

		const data = await this._addMentorSkillUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("succesfull", data));
	};

	removeMentorSkill = async (req: Request, res: Response): Promise<void> => {
		const skillId = req.params.id;
		const mentorId = req.user?.userId;
		const parsed = DeleteMentorSkillSchema.safeParse({ skillId });
		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}
		if (!mentorId) {
			throw new NotFoundError("mentorid not foundS");
		}

		await this._deleteMentorSkillUsecase.execute(mentorId, parsed.data);
		res
			.send(HTTPSTATUS.NO_CONTENT)
			.json(createSuccess("deleted succesfull", {}));
	};

	getMentorProfile = async (req: Request, res: Response): Promise<void> => {
		const mentorId = req.user?.userId;
		if (!mentorId) {
			throw new NotFoundError("mentorid not foundS");
		}
		const profile = await this._getMentorProfileUsecase.execute(mentorId);
		res.status(HTTPSTATUS.OK).json(createSuccess("succesfull", profile));
	};

	addOrUpdateMentorLanguage = async (
		req: Request,
		res: Response,
	): Promise<void> => {
		const parsed = req.validated?.body as MentorLanguageDTO;

		const mentorId = req.user?.userId;

		if (!mentorId) {
			throw new NotFoundError("mentorId not found");
		}

		const data = await this._addMentorLanguageUsecase.execute(mentorId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("successful", data));
	};

	removeMentorLanguage = async (req: Request, res: Response): Promise<void> => {
		const languageId = req.params.id;

		const mentorId = req.user?.userId;

		const parsed = DeleteMentorLanguageSchema.safeParse({
			languageId,
		});

		if (!parsed.success) {
			throw new CustomZodValidationError(parsed.error);
		}

		if (!mentorId) {
			throw new NotFoundError("mentorId not found");
		}

		await this._deleteMentorLanguageUsecase.execute(mentorId, parsed.data);

		res
			.status(HTTPSTATUS.NO_CONTENT)
			.json(createSuccess("deleted successful", {}));
	};

	getAllLanguages = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as GetLanguagesQueryDto;

		const record = await this._getLanguageUsecase.execute(parsed);

		console.log(record);

		res.status(HTTPSTATUS.OK).json(createSuccess("", record));
	};
	EditUserProfile = async (req: Request, res: Response): Promise<void> => {
		const userId = req.user?.userId;
		const parsed = req.validated?.body as editProfileDTO;
		if (!userId) {
			throw new UnAuthenticatedError("user not authenticated");
		}

		const record = await this._editUserProfileUsecase.execute(userId, parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("suscess", record));
	};

	getAllDomains = async (req: Request, res: Response): Promise<void> => {
		const parsed = req.validated?.query as GetDomainQueryDto;

		const records = await this._getDomainUsecase.execute(parsed);

		res.status(HTTPSTATUS.OK).json(createSuccess("success", records));
	};
}
