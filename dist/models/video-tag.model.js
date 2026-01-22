"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoTag = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class VideoTag extends sequelize_1.Model {
}
exports.VideoTag = VideoTag;
VideoTag.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tagId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    urlVideoId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: sequelize_2.sequelize, tableName: "VideoTag", timestamps: true });
