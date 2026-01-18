import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as ratingService from "../services/rating.service";
import { responseError } from "../middlewares/response.middleware";

export const rateVideo = async (req: AuthRequest, res: Response) => {
    try {
        const { videoId, value } = req.body;

        if (typeof value !== "number" || value < 1 || value > 5) {
            return res
                .status(400)
                .json({ message: "Rating must be a number between 1 and 5" });
        }

        const rating = await ratingService.addOrUpdateRating(
            req.user!.id,
            videoId,
            value,
        );

        res.json(rating);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const getRating = async (req: Request, res: Response) => {
    try {
        const videoId = Number(req.params.videoId);
        const rating = await ratingService.getVideoRating(videoId);
        res.json(rating);
    } catch (err: any) {
        return responseError(res, err);
    }
};
