import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as commentService from "../services/comment.service";
import { parsePaginationQuery } from "../utils/pagination";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const createComment = async (req: AuthRequest, res: Response) => {
    try {
        const { videoId, content, parentId } = req.body;
        const comment = await commentService.createComment(
            req.user!.id,
            videoId,
            content,
            parentId,
        );

        return responseSuccess(res, comment);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const listComments = async (req: Request, res: Response) => {
    try {
        const videoId = Number(req.params.videoId);
        const pagination = parsePaginationQuery(req);
        const comments = await commentService.listComments(videoId, pagination);

        return responseSuccess(res, comments);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await commentService.deleteComment(id, req.user!.id);

        return responseSuccess(res, deleted);
    } catch (err: any) {
        return responseError(res, err);
    }
};
