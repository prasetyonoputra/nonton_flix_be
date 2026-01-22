"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCategory = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
const url_video_model_1 = require("./url-video.model");
const category_model_1 = require("./category.model");
class VideoCategory extends sequelize_1.Model {
}
exports.VideoCategory = VideoCategory;
VideoCategory.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    categoryId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    urlVideoId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: "VideoCategory", timestamps: true });
VideoCategory.belongsTo(category_model_1.Category, { foreignKey: "categoryId", as: "category" });
VideoCategory.belongsTo(url_video_model_1.UrlVideo, { foreignKey: "urlVideoId", as: "urlVideo" });
