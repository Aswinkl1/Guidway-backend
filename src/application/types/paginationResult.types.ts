export interface PaginatedResult<T> {
	data: T[];
	totalItems: number;
}

export interface CursorPaginatedResult<T> {
	data: T[];
	hasNext: boolean;
}
