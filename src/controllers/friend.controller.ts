import { Request, Response } from "express";
import * as friendService from "../services/friend.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { parsePaginationQuery } from "../utils/pagination";

export const sendFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.body.friendId);

        const result = await friendService.sendFriendRequest(userId, friendId);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const acceptFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.body.userId);
        const result = await friendService.acceptFriendRequest(
            userId,
            friendId
        );
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const rejectFriendRequest = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.user?.id);
        const friendId = Number(req.body.userId);
        await friendService.rejectFriendRequest(userId, friendId);
        res.json({ message: "Friend request rejected" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listFriends = async (req: AuthRequest, res: Response) => {
    try {
        const pagination = parsePaginationQuery(req);
        const userId = Number(req.user?.id);
        const result = await friendService.listFriends(userId, pagination);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
