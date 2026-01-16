export interface PaginationParamsDto {
    page: number;
    limit: number;
    sort?: string | null;
    dir?: "asc" | "desc" | null;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number | null;
    limit: number | null;
}
