import { Request, Response } from "express";
import * as friendService from "../services/friend.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { parsePaginationQuery } from "../utils/pagination";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const sendFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.body.friendId);

        const result = await friendService.sendFriendRequest(userId, friendId);

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const acceptFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.params.friendId);
        const result = await friendService.acceptFriendRequest(
            userId,
            friendId,
        );

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const rejectFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.params.friendId);
        await friendService.rejectFriendRequest(userId, friendId);

        return responseSuccess(res, null, "Friend request rejected");
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const listFriends = async (req: AuthRequest, res: Response) => {
    try {
        const pagination = parsePaginationQuery(req);
        const userId = Number(req.user?.id);
        const result = await friendService.listFriends(userId, pagination);

        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};
