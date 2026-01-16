import express from "express";
import * as friendController from "../controllers/friend.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
    "/friend-request",
    authMiddleware,
    friendController.sendFriendRequest
);
router.put(
    "/friend-request/:userId/accept",
    authMiddleware,
    friendController.acceptFriendRequest
);
router.delete(
    "/friend-request/:userId/reject",
    authMiddleware,
    friendController.rejectFriendRequest
);

router.get("/", authMiddleware, friendController.listFriends);

export default router;
