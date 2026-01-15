import { Router } from "express";
import * as controller from "../controllers/video.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/auth_role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.create
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.update
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("SUPERADMIN"),
  controller.remove
);

// PUBLIC
router.get("/", controller.findAll);
router.get("/:id", controller.findOne);

export default router;
