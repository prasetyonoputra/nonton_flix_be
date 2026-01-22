"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const sequelize_1 = require("./config/sequelize");
const env_1 = require("./config/env");
(async () => {
    try {
        await sequelize_1.sequelize.authenticate();
        console.log("DB connected");
        await sequelize_1.sequelize.sync({ alter: true });
        app_1.default.listen(env_1.env.PORT, () => {
            console.log(`Server running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error("Server error:", error);
    }
})();
