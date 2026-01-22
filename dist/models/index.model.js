"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_video_model_1 = require("./url-video.model");
const tag_model_1 = require("./tag.model");
const category_model_1 = require("./category.model");
const video_tag_model_1 = require("./video-tag.model");
const video_category_model_1 = require("./video-category.model");
url_video_model_1.UrlVideo.belongsToMany(tag_model_1.Tag, {
    through: video_tag_model_1.VideoTag,
    as: "tags",
    foreignKey: "urlVideoId",
    otherKey: "tagId",
});
tag_model_1.Tag.belongsToMany(url_video_model_1.UrlVideo, {
    through: video_tag_model_1.VideoTag,
    as: "videos",
    foreignKey: "tagId",
    otherKey: "urlVideoId",
});
url_video_model_1.UrlVideo.belongsToMany(category_model_1.Category, {
    through: video_category_model_1.VideoCategory,
    as: "categories",
    foreignKey: "urlVideoId",
    otherKey: "categoryId",
});
category_model_1.Category.belongsToMany(url_video_model_1.UrlVideo, {
    through: video_category_model_1.VideoCategory,
    as: "videos",
    foreignKey: "categoryId",
    otherKey: "urlVideoId",
});
