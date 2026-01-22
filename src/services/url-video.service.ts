import { UrlVideo } from "../models/url-video.model";
import { Category } from "../models/category.model";
import { Tag } from "../models/tag.model";
import {
  formatPaginationResult,
  getPaginationOptions,
  PaginationParams,
  PaginationResult,
} from "../helpers/pagination.helper";
import { sequelize } from "../config/sequelize";
import { FindOptions } from "sequelize";

type UrlVideoCreateDto = {
  title: string;
  url: string;
  thumbnail?: number[];
  categoryIds?: number[];
  tagIds?: number[];
};

type UrlVideoUpdateDto = Partial<UrlVideoCreateDto>;

export class UrlVideoService {
  async getAll(params: PaginationParams): Promise<PaginationResult<UrlVideo>> {
    const options: FindOptions = getPaginationOptions(params);

    options.include = [
      { model: Tag, as: "tags", through: { attributes: [] } },
      { model: Category, as: "categories", through: { attributes: [] } },
    ];

    const { rows, count } = await UrlVideo.findAndCountAll(options);

    return formatPaginationResult(rows, count, params.page || 1, params.limit || 10);
  }

  async getById(id: number | string) {
    return await UrlVideo.findByPk(id, {
      include: [
        { model: Tag, as: "tags", through: { attributes: [] } },
        { model: Category, as: "categories", through: { attributes: [] } },
      ],
    });
  }

  async create(data: UrlVideoCreateDto) {
    const { tagIds, categoryIds, ...videoData } = data;
    const t = await sequelize.transaction();

    try {
      const video = await UrlVideo.create(videoData, { transaction: t });

      if (tagIds && tagIds.length > 0) {
        await (video as any).setTags(tagIds, { transaction: t });
      }

      if (categoryIds && categoryIds.length > 0) {
        await (video as any).setCategories(categoryIds, { transaction: t });
      }

      await t.commit();
      return this.getById(video.id);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async update(id: number | string, data: UrlVideoUpdateDto) {
    const { tagIds, categoryIds, ...videoData } = data;
    const t = await sequelize.transaction();

    try {
      const video = await UrlVideo.findByPk(id, { transaction: t });
      if (!video) throw new Error("Video not found");

      await video.update(videoData, { transaction: t });

      if (tagIds !== undefined) {
        await (video as any).setTags(tagIds, { transaction: t });
      }

      if (categoryIds !== undefined) {
        await (video as any).setCategories(categoryIds, { transaction: t });
      }

      await t.commit();
      return this.getById(id);
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async delete(id: number | string): Promise<boolean> {
    const t = await sequelize.transaction();
    try {
      const video = await UrlVideo.findByPk(id);
      if (!video) return false;

      await video.destroy({ transaction: t });

      await t.commit();
      return true;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
}
