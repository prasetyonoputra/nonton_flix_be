import { Request } from "express";
import { PaginatedResult, PaginationParamsDto } from "../dto/pagination.dto";

export function parsePaginationQuery(req: Request): PaginationParamsDto {
  const { page = "1", limit = "50", sort, dir } = req.query;

  return {
    page: Math.max(Number(page), 1),
    limit: Math.max(Number(limit), 1),
    sort: sort !== undefined ? String(sort) : null,
    dir: dir === "asc" || dir === "desc" ? (dir as "asc" | "desc") : null,
  };
}