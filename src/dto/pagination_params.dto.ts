export interface PaginationParamsDto {
  page: number;
  limit: number;
  sort?: string;
  dir?: "asc" | "desc";
}
