import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as commentService from "../services/comment.service";
import { parsePaginationQuery } from "../utils/pagination";

export const createComment = async (req: AuthRequest, res: Response) => {
    try {
        const { videoId, content, parentId } = req.body;
        const comment = await commentService.createComment(
            req.user!.id,
            videoId,
            content,
            parentId
        );
        res.json(comment);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const listComments = async (req: Request, res: Response) => {
    try {
        const videoId = Number(req.params.videoId);
        const pagination = parsePaginationQuery(req);
        const comments = await commentService.listComments(videoId, pagination);
        res.json(comments);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const deleted = await commentService.deleteComment(id, req.user!.id);
        res.json({ message: "Deleted", comment: deleted });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
