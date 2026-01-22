"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlVideo = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
class UrlVideo extends sequelize_1.Model {
}
exports.UrlVideo = UrlVideo;
UrlVideo.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    url: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    thumbnail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue("thumbnail");
            if (!rawValue)
                return null;
            const baseUrl = process.env.BASE_URL || "http://localhost:5000";
            return `${baseUrl}/uploads/thumbnails/${rawValue}`;
        },
    },
}, {
    sequelize: sequelize_2.sequelize,
    tableName: "UrlVideo",
    timestamps: true,
});
