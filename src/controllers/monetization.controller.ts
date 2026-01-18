import { Request, Response } from "express";
import * as service from "../services/monetization.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const createAd = async (req: Request, res: Response) => {
    try {
        const { videoId, title, revenue } = req.body;
        const ad = await service.createAdVideo(videoId, title, revenue);

        return responseSuccess(res, ad);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const subscribePremium = async (req: AuthRequest, res: Response) => {
    try {
        const { endDate, price } = req.body;
        const userId = Number(req.user?.id);

        const subscription = await service.subscribePremium(
            userId,
            new Date(endDate),
            price,
        );

        return responseSuccess(res, subscription);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const donate = async (req: AuthRequest, res: Response) => {
    try {
        const { toUserId, videoId, amount, message } = req.body;
        const fromUserId = Number(req.user?.id);
        const donation = await service.donate(
            fromUserId,
            toUserId,
            amount,
            videoId,
            message,
        );

        return responseSuccess(res, donation);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const sellContent = async (req: AuthRequest, res: Response) => {
    try {
        const { contentId, price } = req.body;
        const buyerId = Number(req.user?.id);
        const sale = await service.sellContent(contentId, buyerId, price);

        return responseSuccess(res, sale);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const getRevenueStats = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const stats = await service.getRevenueStats(Number(userId));

        return responseSuccess(res, stats);
    } catch (err: any) {
        return responseError(res, err);
    }
};
