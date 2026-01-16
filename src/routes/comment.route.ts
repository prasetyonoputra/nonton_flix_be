import { Router } from "express";
import * as commentController from "../controllers/comment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, commentController.createComment);
router.get("/:videoId", authMiddleware, commentController.listComments);
router.delete("/:id", authMiddleware, commentController.deleteComment);

export default router;
