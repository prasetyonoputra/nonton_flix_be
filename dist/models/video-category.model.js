"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class VideoCategory extends sequelize_1.Model {
}
exports.VideoCategory = VideoCategory;
VideoCategory.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    categoryId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    urlVideoId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: "VideoCategory", timestamps: true });
