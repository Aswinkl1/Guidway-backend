import type { ISettingOutputDTO } from "@application/mappers/mentorSettings.mapper";

export interface IGetSettingsUsecase {
	execute(mentorId: string): Promise<ISettingOutputDTO>;
}
