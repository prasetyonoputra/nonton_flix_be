import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import urlVideoRoutes from "./url-video.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/url-videos", urlVideoRoutes);

export default router;
