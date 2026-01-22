import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class VideoTag extends Model {
  declare id: number;
  declare tagId: number;
  declare urlVideoId: number;
}

VideoTag.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tagId: { type: DataTypes.INTEGER, allowNull: false },
    urlVideoId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "VideoTag", timestamps: true },
);
