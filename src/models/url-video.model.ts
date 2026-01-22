import { BelongsToManySetAssociationsMixin, DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Category } from "./category.model";
import { Tag } from "./tag.model";

export class UrlVideo extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare url: string;
  declare thumbnail: string;

  declare setTags: BelongsToManySetAssociationsMixin<Tag, number>;
  declare setCategories: BelongsToManySetAssociationsMixin<Category, number>;
}

UrlVideo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("thumbnail");
        if (!rawValue) return null;

        const baseUrl = process.env.BASE_URL || "http://localhost:5000";
        return `${baseUrl}/uploads/thumbnails/${rawValue}`;
      },
    },
  },
  {
    sequelize,
    tableName: "UrlVideo",
    timestamps: true,
  },
);
