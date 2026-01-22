"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const pagination_helper_1 = require("../helpers/pagination.helper");
const user_model_1 = require("../models/user.model");
class UserService {
    constructor() {
        this.saltRounds = 10;
    }
    async getAll(params) {
        const options = (0, pagination_helper_1.getPaginationOptions)(params);
        options.attributes = { exclude: ["password"] };
        const { rows, count } = await user_model_1.UserApp.findAndCountAll(options);
        return (0, pagination_helper_1.formatPaginationResult)(rows, count, params.page || 1, params.limit || 10);
    }
    async getById(id) {
        return await user_model_1.UserApp.findByPk(id, {
            attributes: { exclude: ["password"] },
        });
    }
    async create(data) {
        if (data.password) {
            data.password = await bcrypt_1.default.hash(data.password, this.saltRounds);
        }
        const user = await user_model_1.UserApp.create(data);
        const result = user.toJSON();
        delete result.password;
        return result;
    }
    async update(id, data) {
        const user = await user_model_1.UserApp.findByPk(id);
        if (!user)
            return null;
        if (data.password) {
            data.password = await bcrypt_1.default.hash(data.password, this.saltRounds);
        }
        await user.update(data);
        return this.getById(id);
    }
    async delete(id) {
        const user = await user_model_1.UserApp.findByPk(id);
        if (!user)
            return false;
        await user.destroy();
        return true;
    }
    async findByEmail(email) {
        return await user_model_1.UserApp.findOne({ where: { email } });
    }
}
exports.UserService = UserService;
