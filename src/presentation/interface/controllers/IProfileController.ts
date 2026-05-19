import type { Request, Response } from "express";

export interface IProfileController {
	addEducation(req: Request, res: Response): Promise<void>;
	updateEducation(req: Request, res: Response): Promise<void>;
	deleteEducation(req: Request, res: Response): Promise<void>;
	addExperience(req: Request, res: Response): Promise<void>;
	editExperience(req: Request, res: Response): Promise<void>;
	deleteExperience(req: Request, res: Response): Promise<void>;
	addAchievement(req: Request, res: Response): Promise<void>;
	getAllSkills(req: Request, res: Response): Promise<void>;
	addOrUpdateMentorSkills(req: Request, res: Response): Promise<void>;
	removeMentorSkill(req: Request, res: Response): Promise<void>;
	getMentorProfile(req: Request, res: Response): Promise<void>;
	addOrUpdateMentorLanguage(req: Request, res: Response): Promise<void>;
	removeMentorLanguage(req: Request, res: Response): Promise<void>;
	getAllLanguages(req: Request, res: Response): Promise<void>;
	EditUserProfile(req: Request, res: Response): Promise<void>;
	getAllDomains(req: Request, res: Response): Promise<void>;
	updateMentorOverview(req: Request, res: Response): Promise<void>;
	updateSocailMediaLinks(req: Request, res: Response): Promise<void>;
	updateProfileKey(req: Request, res: Response): Promise<void>;
	updateAchievement(req: Request, res: Response): Promise<void>;
	deleteAchievement(req: Request, res: Response): Promise<void>;
}
