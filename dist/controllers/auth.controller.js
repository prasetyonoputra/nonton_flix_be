"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_helper_1 = require("../helpers/response.helper");
class AuthController {
    constructor() {
        this.service = new auth_service_1.AuthService();
        this.register = async (req, res) => {
            const user = await this.service.register(req.body.email, req.body.password);
            return (0, response_helper_1.success)(res, user, "Registered");
        };
        this.login = async (req, res) => {
            const token = await this.service.login(req.body.email, req.body.password);
            return (0, response_helper_1.success)(res, { token }, "Login success");
        };
    }
}
exports.AuthController = AuthController;
