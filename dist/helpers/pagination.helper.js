"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaginationOptions = getPaginationOptions;
exports.formatPaginationResult = formatPaginationResult;
function getPaginationOptions(params, defaultSort = "id", defaultOrder = "ASC") {
    const page = params.page && params.page > 0 ? params.page : 1;
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    const offset = (page - 1) * limit;
    let sortByColumns = params.sortBy ? params.sortBy.split(",") : [];
    let sortOrders = params.sortOrder ? params.sortOrder.split(",") : [];
    if (sortByColumns.length === 0) {
        sortByColumns = Array.isArray(defaultSort) ? defaultSort : [defaultSort];
        sortOrders = Array.isArray(defaultOrder) ? defaultOrder : [defaultOrder];
    }
    const order = sortByColumns.map((col, idx) => {
        const direction = sortOrders[idx] ? sortOrders[idx].toUpperCase() : "ASC";
        return [col, direction];
    });
    return {
        limit,
        offset,
        order,
    };
}
function formatPaginationResult(data, total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        total,
        totalPages,
        currentPage: page,
    };
}
