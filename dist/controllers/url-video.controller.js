"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlVideoController = void 0;
const response_helper_1 = require("../helpers/response.helper");
const url_video_service_1 = require("../services/url-video.service");
class UrlVideoController {
    constructor() {
        this.service = new url_video_service_1.UrlVideoService();
        this.getAll = async (req, res) => {
            try {
                const params = {
                    page: req.query.page ? Number(req.query.page) : undefined,
                    limit: req.query.limit ? Number(req.query.limit) : undefined,
                    sortBy: req.query.sortBy,
                    sortOrder: req.query.sortOrder,
                };
                const result = await this.service.getAll(params);
                return (0, response_helper_1.success)(res, result, "Fetched all videos");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const result = await this.service.getById(id);
                if (!result)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, result, "Fetched video details");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.create = async (req, res) => {
            try {
                const data = { ...req.body };
                if (req.file)
                    data.thumbnail = req.file.filename;
                if (typeof data.categoryIds === "string")
                    data.categoryIds = JSON.parse(data.categoryIds);
                if (typeof data.tagIds === "string")
                    data.tagIds = JSON.parse(data.tagIds);
                const result = await this.service.create(data);
                return (0, response_helper_1.success)(res, result, "Video created successfully", 201);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.update = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const data = { ...req.body };
                if (req.file)
                    data.thumbnail = req.file.filename;
                if (typeof data.categoryIds === "string")
                    data.categoryIds = JSON.parse(data.categoryIds);
                if (typeof data.tagIds === "string")
                    data.tagIds = JSON.parse(data.tagIds);
                const result = await this.service.update(id, data);
                if (!result)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, result, "Video updated successfully");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.delete = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const isDeleted = await this.service.delete(id);
                if (!isDeleted)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, null, "Video deleted successfully");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
    }
}
exports.UrlVideoController = UrlVideoController;
