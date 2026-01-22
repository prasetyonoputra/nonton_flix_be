"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_model_1 = require("../models/user.model");
const base_repository_1 = require("./base.repository");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(user_model_1.UserApp);
    }
    async findByEmail(email) {
        return await user_model_1.UserApp.findOne({ where: { email } });
    }
}
exports.UserRepository = UserRepository;
