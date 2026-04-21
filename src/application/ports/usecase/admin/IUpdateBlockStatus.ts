import type { updateBlockStatusDto } from "@application/dto/admin/UpdateBlockStatus.dto";

export interface IUpdateBlockStatus {
	execute(dto: updateBlockStatusDto): Promise<void>;
}
