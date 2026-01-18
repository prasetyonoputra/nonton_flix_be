import { Request, Response } from "express";
import * as videoService from "../services/video.service";
import { parsePaginationQuery } from "../utils/pagination";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const create = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const { title, description, url } = req.body;

        const thumbnail = req.file?.path;
        const categoryIds = req.body.categoryIds
            ? JSON.parse(req.body.categoryIds)
            : [];
        const tagIds = req.body.tagIds ? JSON.parse(req.body.tagIds) : [];

        const video = await videoService.createVideo(userId, {
            title,
            description,
            url,
            thumbnail,
            categoryIds,
            tagIds,
        });

        return responseSuccess(res, video);
    } catch (err: any) {
        return responseError(res, err.message, 400, err);
    }
};

export const findAll = async (req: Request, res: Response) => {
    const pagination = parsePaginationQuery(req);
    const videos = await videoService.getVideos(pagination);

    return responseSuccess(res, videos);
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const video = await videoService.getVideoById(Number(req.params.id));

        return responseSuccess(res, video);
    } catch (err: any) {
        return responseError(res, err.message, 400, err);
    }
};

export const update = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const videoId = Number(req.params.videoId);
        const { title, description } = req.body;
        const thumbnail = req.file?.path;
        const categoryIds = req.body.categoryIds
            ? JSON.parse(req.body.categoryIds)
            : [];
        const tagIds = req.body.tagIds ? JSON.parse(req.body.tagIds) : [];

        const updatedVideo = await videoService.updateVideo(userId, videoId, {
            title,
            description,
            categoryIds,
            tagIds,
            thumbnail,
        });

        return responseSuccess(res, updatedVideo);
    } catch (err: any) {
        return responseError(res, err.message, 400, err);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await videoService.deleteVideo(Number(req.params.id));

        return responseSuccess(res, null);
    } catch (err: any) {
        return responseError(res, err.message, 400, err);
    }
};
