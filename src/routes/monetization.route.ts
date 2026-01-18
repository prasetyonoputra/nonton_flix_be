import { Router } from "express";
import * as controller from "../controllers/monetization.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/ads", authMiddleware, controller.createAd);
router.post("/premium/subscribe", authMiddleware, controller.subscribePremium);
router.post("/donate", authMiddleware, controller.donate);
router.post("/sell", authMiddleware, controller.sellContent);
router.get("/revenue/:userId", authMiddleware, controller.getRevenueStats);

export default router;
