"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationOptions = void 0;
exports.formatPaginationResult = formatPaginationResult;
const getPaginationOptions = (params) => {
    const page = Number(params.page) > 0 ? Number(params.page) : 1;
    const limit = Number(params.limit) > 0 ? Number(params.limit) : 10;
    const offset = (page - 1) * limit;
    let order = [];
    if (params.sortBy) {
        const sortFields = Array.isArray(params.sortBy)
            ? params.sortBy
            : [params.sortBy];
        const sortOrders = Array.isArray(params.sortOrder)
            ? params.sortOrder
            : [params.sortOrder || "ASC"];
        order = sortFields.map((field, i) => {
            const direction = (sortOrders[i] || "ASC").toUpperCase();
            return [field, direction];
        });
    }
    return {
        limit,
        offset,
        order,
    };
};
exports.getPaginationOptions = getPaginationOptions;
function formatPaginationResult(data, total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        total,
        totalPages,
        currentPage: page,
    };
}
