"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlVideoService = void 0;
const url_video_model_1 = require("../models/url-video.model");
const category_model_1 = require("../models/category.model");
const tag_model_1 = require("../models/tag.model");
const pagination_helper_1 = require("../helpers/pagination.helper");
const sequelize_1 = require("../config/sequelize");
class UrlVideoService {
    async getAll(params) {
        const options = (0, pagination_helper_1.getPaginationOptions)(params);
        options.include = [
            { model: tag_model_1.Tag, as: "tags", through: { attributes: [] } },
            { model: category_model_1.Category, as: "categories", through: { attributes: [] } },
        ];
        const { rows, count } = await url_video_model_1.UrlVideo.findAndCountAll(options);
        return (0, pagination_helper_1.formatPaginationResult)(rows, count, params.page || 1, params.limit || 10);
    }
    async getById(id) {
        return await url_video_model_1.UrlVideo.findByPk(id, {
            include: [
                { model: tag_model_1.Tag, as: "tags", through: { attributes: [] } },
                { model: category_model_1.Category, as: "categories", through: { attributes: [] } },
            ],
        });
    }
    async create(data) {
        const { tagIds, categoryIds, ...videoData } = data;
        const t = await sequelize_1.sequelize.transaction();
        try {
            const video = await url_video_model_1.UrlVideo.create(videoData, { transaction: t });
            if (tagIds && tagIds.length > 0) {
                await video.setTags(tagIds, { transaction: t });
            }
            if (categoryIds && categoryIds.length > 0) {
                await video.setCategories(categoryIds, { transaction: t });
            }
            await t.commit();
            return this.getById(video.id);
        }
        catch (err) {
            await t.rollback();
            throw err;
        }
    }
    async update(id, data) {
        const { tagIds, categoryIds, ...videoData } = data;
        const t = await sequelize_1.sequelize.transaction();
        try {
            const video = await url_video_model_1.UrlVideo.findByPk(id, { transaction: t });
            if (!video)
                throw new Error("Video not found");
            await video.update(videoData, { transaction: t });
            if (tagIds !== undefined) {
                await video.setTags(tagIds, { transaction: t });
            }
            if (categoryIds !== undefined) {
                await video.setCategories(categoryIds, { transaction: t });
            }
            await t.commit();
            return this.getById(id);
        }
        catch (err) {
            await t.rollback();
            throw err;
        }
    }
    async delete(id) {
        const t = await sequelize_1.sequelize.transaction();
        try {
            const video = await url_video_model_1.UrlVideo.findByPk(id);
            if (!video)
                return false;
            await video.destroy({ transaction: t });
            await t.commit();
            return true;
        }
        catch (err) {
            await t.rollback();
            throw err;
        }
    }
}
exports.UrlVideoService = UrlVideoService;
