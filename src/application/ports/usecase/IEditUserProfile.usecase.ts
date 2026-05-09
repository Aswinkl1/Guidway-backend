import type { editProfileDTO } from "@application/dto/user/EditProfile.dto";
import type { UserProfileOutputDTO } from "@application/mappers/user-profile.mapper";

export interface IEditUserProfileUsecase {
	execute(userId: string, dto: editProfileDTO): Promise<UserProfileOutputDTO>;
}
