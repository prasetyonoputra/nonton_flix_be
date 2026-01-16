import { Request, Response } from "express";
import * as videoService from "../services/video.service";
import { parsePaginationQuery } from "../utils/pagination";

export const create = async (req: Request, res: Response) => {
    try {
        const video = await videoService.createVideo(req.body);
        res.status(201).json(video);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const findAll = async (req: Request, res: Response) => {
    const pagination = parsePaginationQuery(req);
    const videos = await videoService.getVideos(pagination);
    res.json(videos);
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const video = await videoService.getVideoById(Number(req.params.id));
        res.json(video);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const video = await videoService.updateVideo(
            Number(req.params.id),
            req.body
        );
        res.json(video);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await videoService.deleteVideo(Number(req.params.id));
        res.json({ message: "Video deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};
