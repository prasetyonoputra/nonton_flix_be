import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";

export class UserApp extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare role: string;
}

UserApp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "UserApp",
    timestamps: true,
  },
);
