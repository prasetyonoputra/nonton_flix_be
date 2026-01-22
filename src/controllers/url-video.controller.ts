import { Request, Response } from "express";
import { error, notFound, success } from "../helpers/response.helper";
import { UrlVideoService } from "../services/url-video.service";
import { PaginationParams } from "../helpers/pagination.helper";

export class UrlVideoController {
  private service = new UrlVideoService();

  getAll = async (req: Request, res: Response) => {
    try {
      const params: PaginationParams = {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
      };

      const result = await this.service.getAll(params);
      return success(res, result, "Fetched all videos");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.getById(id);

      if (!result) return notFound(res);
      return success(res, result, "Fetched video details");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = { ...req.body };

      if (req.file) data.thumbnail = req.file.filename;

      if (typeof data.categoryIds === "string") data.categoryIds = JSON.parse(data.categoryIds);
      if (typeof data.tagIds === "string") data.tagIds = JSON.parse(data.tagIds);

      const result = await this.service.create(data);
      return success(res, result, "Video created successfully", 201);
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = { ...req.body };

      if (req.file) data.thumbnail = req.file.filename;

      if (typeof data.categoryIds === "string") data.categoryIds = JSON.parse(data.categoryIds);
      if (typeof data.tagIds === "string") data.tagIds = JSON.parse(data.tagIds);

      const result = await this.service.update(id, data);
      if (!result) return notFound(res);

      return success(res, result, "Video updated successfully");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const isDeleted = await this.service.delete(id);

      if (!isDeleted) return notFound(res);
      return success(res, null, "Video deleted successfully");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };
}
