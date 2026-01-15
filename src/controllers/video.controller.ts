import { Request, Response } from "express";
import * as videoService from "../services/video.service";

export const create = async (req: Request, res: Response) => {
  try {
    const video = await videoService.createVideo(req.body);
    res.status(201).json(video);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const findAll = async (_: Request, res: Response) => {
  const videos = await videoService.getVideos();
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
