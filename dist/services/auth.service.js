"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_service_1 = require("../services/user.service");
const bcrypt_util_1 = require("../utils/bcrypt.util");
const jwt_util_1 = require("../utils/jwt.util");
class AuthService {
    constructor() {
        this.service = new user_service_1.UserService();
    }
    async register(email, password) {
        const hashed = await (0, bcrypt_util_1.hashPassword)(password);
        const user = await this.service.create({
            email,
            password: hashed,
            role: "USER",
        });
        return user;
    }
    async login(email, password) {
        const user = await this.service.findByEmail(email);
        if (!user)
            throw new Error("User not found");
        const valid = await (0, bcrypt_util_1.comparePassword)(password, user.password);
        if (!valid)
            throw new Error("Invalid password");
        return (0, jwt_util_1.signToken)({ id: user.id, role: user.role });
    }
}
exports.AuthService = AuthService;
