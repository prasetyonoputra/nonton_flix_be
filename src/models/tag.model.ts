import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class Tag extends Model {
  declare id: number;
  declare name: string;
}

Tag.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { sequelize, tableName: "Tag", timestamps: true },
);
