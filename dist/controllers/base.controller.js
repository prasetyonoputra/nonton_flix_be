"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const response_helper_1 = require("../helpers/response.helper");
class BaseController {
    constructor(service) {
        this.create = async (req, res, next) => {
            try {
                const data = req.body;
                const result = await this.service.create(data);
                return (0, response_helper_1.success)(res, result, "Created", 201);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const result = await this.service.getById(id);
                if (!result)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, result);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const data = req.body;
                const result = await this.service.update(id, data);
                if (!result)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, result, "Updated");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = Number(req.params.id);
                const deleted = await this.service.delete(id);
                if (!deleted)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, null, "Deleted", 204);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.getAll = async (req, res, next) => {
            const getStringQuery = (value) => {
                if (!value)
                    return undefined;
                if (Array.isArray(value))
                    return String(value[0]);
                if (typeof value === "string")
                    return value;
                return String(value);
            };
            try {
                const pageParam = req.query.page;
                const limitParam = req.query.limit;
                const sortByParam = req.query.sortBy;
                const sortOrderParam = req.query.sortOrder;
                const params = {
                    page: pageParam ? Number(getStringQuery(pageParam)) : undefined,
                    limit: limitParam ? Number(getStringQuery(limitParam)) : undefined,
                    sortBy: getStringQuery(sortByParam),
                    sortOrder: getStringQuery(sortOrderParam),
                };
                const result = await this.service.getAll(params);
                return (0, response_helper_1.success)(res, result);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.service = service;
    }
}
exports.BaseController = BaseController;
