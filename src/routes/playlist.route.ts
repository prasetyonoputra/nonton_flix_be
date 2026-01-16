import { Router } from "express";
import * as playlistController from "../controllers/playlist.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, playlistController.createPlaylist);
router.post("/add-video", authMiddleware, playlistController.addVideo);
router.post("/remove-video", authMiddleware, playlistController.removeVideo);
router.get("/", authMiddleware, playlistController.getPlaylists);
router.delete("/:id", authMiddleware, playlistController.deletePlaylist);

export default router;
