"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApp = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class UserApp extends sequelize_1.Model {
}
exports.UserApp = UserApp;
UserApp.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "UserApp",
    timestamps: true,
});
