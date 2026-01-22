import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class VideoCategory extends Model {
  declare id: number;
  declare categoryId: number;
  declare urlVideoId: number;
}

VideoCategory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    urlVideoId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "VideoCategory", timestamps: true },
);
