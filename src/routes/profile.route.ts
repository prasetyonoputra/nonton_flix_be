import { Router } from "express";
import * as controller from "../controllers/profile.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.put("/:id", authMiddleware, controller.update);
router.get("/:id", authMiddleware, controller.findOne);

export default router;
