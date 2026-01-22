import { UrlVideo } from "./url-video.model";
import { Tag } from "./tag.model";
import { Category } from "./category.model";
import { VideoTag } from "./video-tag.model";
import { VideoCategory } from "./video-category.model";

UrlVideo.belongsToMany(Tag, {
  through: VideoTag,
  as: "tags",
  foreignKey: "urlVideoId",
  otherKey: "tagId",
});

Tag.belongsToMany(UrlVideo, {
  through: VideoTag,
  as: "videos",
  foreignKey: "tagId",
  otherKey: "urlVideoId",
});

UrlVideo.belongsToMany(Category, {
  through: VideoCategory,
  as: "categories",
  foreignKey: "urlVideoId",
  otherKey: "categoryId",
});

Category.belongsToMany(UrlVideo, {
  through: VideoCategory,
  as: "videos",
  foreignKey: "categoryId",
  otherKey: "urlVideoId",
});
