"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const response_helper_1 = require("../helpers/response.helper");
const user_service_1 = require("../services/user.service");
class UserController {
    constructor() {
        this.service = new user_service_1.UserService();
        this.getAll = async (req, res) => {
            try {
                const params = {
                    page: req.query.page ? Number(req.query.page) : undefined,
                    limit: req.query.limit ? Number(req.query.limit) : undefined,
                    sortBy: req.query.sortBy,
                    sortOrder: req.query.sortOrder,
                };
                const result = await this.service.getAll(params);
                return (0, response_helper_1.success)(res, result, "Fetched all users");
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
                return (0, response_helper_1.success)(res, result, "Fetched user details");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.create = async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return (0, response_helper_1.error)(res, "Email and password are required", 400);
                }
                const existingUser = await this.service.findByEmail(email);
                if (existingUser) {
                    return (0, response_helper_1.error)(res, "Email already in use", 400);
                }
                const result = await this.service.create(req.body);
                return (0, response_helper_1.success)(res, result, "User created successfully", 201);
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
        this.update = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const result = await this.service.update(id, req.body);
                if (!result)
                    return (0, response_helper_1.notFound)(res);
                return (0, response_helper_1.success)(res, result, "User updated successfully");
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
                return (0, response_helper_1.success)(res, null, "User deleted successfully");
            }
            catch (err) {
                return (0, response_helper_1.error)(res, err.message || "Internal Server Error", 500);
            }
        };
    }
}
exports.UserController = UserController;
