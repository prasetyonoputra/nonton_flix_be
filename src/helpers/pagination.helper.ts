import { FindOptions, Order, OrderItem } from "sequelize";

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}
export const getPaginationOptions = (params: PaginationParams): FindOptions => {
  const page = Number(params.page) > 0 ? Number(params.page) : 1;
  const limit = Number(params.limit) > 0 ? Number(params.limit) : 10;
  const offset = (page - 1) * limit;

  let order: Order = [];

  if (params.sortBy) {
    const sortFields = Array.isArray(params.sortBy)
      ? params.sortBy
      : [params.sortBy];

    const sortOrders = Array.isArray(params.sortOrder)
      ? params.sortOrder
      : [params.sortOrder || "ASC"];

    order = sortFields.map((field, i) => {
      const direction = (sortOrders[i] || "ASC").toUpperCase();
      return [field, direction] as OrderItem;
    });
  }

  return {
    limit,
    offset,
    order,
  };
};
export function formatPaginationResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    total,
    totalPages,
    currentPage: page,
  };
}
