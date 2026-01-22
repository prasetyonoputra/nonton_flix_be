"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class Tag extends sequelize_1.Model {
}
exports.Tag = Tag;
Tag.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
}, { sequelize: sequelize_2.sequelize, tableName: "Tag", timestamps: true });
